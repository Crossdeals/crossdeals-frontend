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

        this.cards = [];

        for (let i = 0; i < this.sectionData.data.length; i++) {
            let card = this.addCard(i, this.sectionData.data[i]);
            this.cards.push(card);
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
        cardPrice.innerHTML = gameCardData.price;
        
        const callback = this.wishlistCallback;
        const section = this;
        wishlistAddButton.hidden = !gameCardData.isWishlisted;
        wishlistAddButton.addEventListener("click", () => callback(section, index, gameCardData.gameId, gameCardData.title, true));
        wishlistRemoveButton.hidden = gameCardData.isWishlisted;
        wishlistRemoveButton.addEventListener("click", () => callback(section, index, gameCardData.gameId, gameCardData.title, false));
        
        for (let i = 0; i < gameCardData.platforms.length; i++) {
            const newChip = platformChip.cloneNode(true);
            const newChipText = newChip.querySelector("p");

            newChipText.innerHTML = gameCardData.platforms[i];
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