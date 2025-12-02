class GameCardSectionListData {
    constructor(sectionList) {
        this.sectionList = sectionList;
    }
}

class GameCardSectionData {
    constructor(title, dataList) {
        this.data = dataList;
        this.header = title;
    }

    addCard(gameCardData) {
        this.data.concat(gameCardData);
    }
}

class GameCardData {
    constructor(data) {
        this.gameId = data.id;
        this.image = data.image;
        this.title = data.title;
        this.price = data.price;
        this.platforms = data.platforms;
        this.isWishlisted = data.isWishlisted;
    }
}

class GameSectionsPresenter {
    constructor(sections, wishlistCallback) {
        this.sectionContainer = document.querySelector(".section-container");
        this.sectionObjectList = [];
        this.tempSection = document.querySelector(".deal-section");

        for (let i = 0; i < sections.sectionList.length; i++) {
            this.displaySection(sections.sectionList[i], wishlistCallback);
        }

        this.removeTempObjects();
    }

    displaySection(section, wishlistCallback) {
        let sectionObject = new GameCardSection(section, wishlistCallback);
        sectionObject.appendToContainer(this.sectionContainer);
        this.sectionObjectList.concat(sectionObject);
    }

    removeTempObjects() {
        this.tempSection.remove();
    }
}

class GameCardSection {
    constructor(section, wishlistCallback) {
        this.sectionData = section;
        this.wishlistCallback = wishlistCallback;

        this.sectionTemplate = document.querySelector(".deal-section");
        this.section = this.sectionTemplate.cloneNode(true);
        this.sectionHeader = this.section.querySelector(".section-header");
        this.cardContainer = this.section.querySelector(".card-container");
        this.cardTemplate = this.section.querySelector(".deal-card");
        this.cardContainerPlaceholder = this.section.querySelector(".no-cards");

        this.cards = [];

        for (let i = 0; i < this.sectionData.data.length; i++) {
            let card = this.addCard(i, this.sectionData.data[i]);
            this.cards.push(card);
        }

        if (this.sectionData.data.length == 0) {
            this.cardContainerPlaceholder.hidden = false;
        }
        else {
            this.cardContainerPlaceholder.hidden = true;
        }

        this.sectionHeader.innerHTML = this.sectionData.header;
        this.cardTemplate.remove();
    }

    appendToContainer(container) {
        container.appendChild(this.section);
    }

    addCard(gameIndex, gameCardData) {
        const index = gameIndex;
        const card = this.cardTemplate.cloneNode(true);
        const cardImage = card.querySelector(".card-image");
        const cardTitle = card.querySelector(".card-title");
        const cardPrice = card.querySelector(".card-price");
        const cardPlatformContainer = card.querySelector(".card-platform-container");
        const platformChip = card.querySelector(".platform-chip");
        const wishlistAddButton = card.querySelector(".wishlist-add");
        const wishlistRemoveButton = card.querySelector(".wishlist-remove");

        cardImage.src = gameCardData.image;
        cardTitle.innerHTML = gameCardData.title;
        cardPrice.innerHTML = dollarAmountFormatted(gameCardData.price);
        cardTitle.addEventListener("click", () => window.location = `./details.html?title=${gameCardData.title}`)
        
        const callback = this.wishlistCallback;
        const section = this;
        if (gameCardData.isWishlisted === undefined) {
            wishlistAddButton.hidden = true;
            wishlistRemoveButton.hidden = true;
        }
        else {
            wishlistAddButton.hidden = gameCardData.isWishlisted;
            wishlistAddButton.addEventListener("click", () => callback(section, index, gameCardData.gameId, gameCardData.title, true));
            wishlistRemoveButton.hidden = !gameCardData.isWishlisted;
            wishlistRemoveButton.addEventListener("click", () => callback(section, index, gameCardData.gameId, gameCardData.title, false));
        }
        
        const platforms = [];
        for (let i = 0; i < gameCardData.platforms.length; i++) {
            const platform = gameCardData.platforms[i]
            if (platforms.includes(platform)) {
                continue;
            }
            platforms.push(platform);
            const newChip = platformChip.cloneNode(true);
            const newChipText = newChip.querySelector("p");

            newChipText.innerHTML = platform;
            cardPlatformContainer.appendChild(newChip);
        }
        
        platformChip.remove();

        this.cardContainer.appendChild(card);
        return card;
    }

    updateCardWishlistStatus(section, index, isWishlisted) {
        const card = section.cards[index];
        const wishlistAddButton = card.querySelector(".wishlist-add");
        const wishlistRemoveButton = card.querySelector(".wishlist-remove");
        wishlistAddButton.hidden = isWishlisted;
        wishlistRemoveButton.hidden = !isWishlisted;
    }
}

class FeaturedGamePresenter {
    constructor() {
        this.featuredTitle = document.getElementById("feature-title");
        this.featuredPublisherDate = document.getElementById("feature-publisher");
        this.featuredPrice = document.getElementById("feature-price");
        this.featuredPercentage = document.getElementById("feature-percentage");
        this.featuredEndDate = document.getElementById("feature-date");
        this.featuredDescription = document.getElementById("feature-description");
        this.featuredMoreButton = document.getElementById("feature-more-button");

        this.featuredPlatformContainer = document.getElementById("feature-platform-container");
        this.featuredPlatformChipTemplate = document.querySelector(".platform-chip");

        this.featuredGameId = null;
    }

    populateFeaturedGame(apiGameData) {
        const featuredGameDetails = gameDetailsToDetailsScreen(apiGameData);
        const lowestPriceDetails = getLowestPriceDetails(apiGameData, platformManager);

        this.featuredGameId = featuredGameDetails.id;

        this.featuredTitle.innerHTML = featuredGameDetails.title;
        this.featuredPublisherDate.innerHTML = mainMessages.publisherDate.replace("{0}", featuredGameDetails.publisher).replace("{1}", featuredGameDetails.year);
        this.featuredPrice.innerHTML = dollarAmountFormatted(lowestPriceDetails.lowestPrice);
        this.featuredPercentage.innerHTML = mainMessages.percentageOff.replace("{0}", floatToPercentageString(lowestPriceDetails.salePercentage)).replace("{1}", dollarAmountFormatted(lowestPriceDetails.originalPrice));
        this.featuredEndDate.innerHTML = mainMessages.dealEnding.replace("{0}", lowestPriceDetails.endDate);
        this.featuredDescription.innerHTML = featuredGameDetails.description;
        this.featuredMoreButton.addEventListener("click", () => this.goToFeaturedGameDetails(featuredGameDetails.title))
        
        const platforms = [];
        for (let i = 0; i < featuredGameDetails.platforms.length; i++) {
            const platform = featuredGameDetails.platforms[i]
            if (platforms.includes(platform)) {
                continue;
            }
            platforms.push(platform);
            const newChip = this.featuredPlatformChipTemplate.cloneNode(true);
            const newChipText = newChip.querySelector("p");

            newChipText.innerHTML = platform;
            this.featuredPlatformContainer.appendChild(newChip);
        }

        this.featuredPlatformChipTemplate.remove();
    }

    goToFeaturedGameDetails(gameTitle) {
        window.location = `details.html?title=${gameTitle}`;
    }

    setupDetailsError() {
        this.featuredMoreButton.addEventListener("click", () => notificationManager.showBannerTemporarily(errorMessages.featuredGameError));
    }
}