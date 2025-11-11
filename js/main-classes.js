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
        let index = gameIndex;
        let card = this.cardTemplate.cloneNode(true);
        let cardImage = card.querySelector(".card-image");
        let cardTitle = card.querySelector(".card-title");
        let cardPrice = card.querySelector(".card-price");
        let cardPlatformContainer = card.querySelector(".card-platform-container");
        let platformChip = card.querySelector(".platform-chip");
        let wishlistAddButton = card.querySelector(".wishlist-add");
        let wishlistRemoveButton = card.querySelector(".wishlist-remove");

        cardImage.src = gameCardData.image;
        cardTitle.innerHTML = gameCardData.title;
        cardPrice.innerHTML = gameCardData.price;
        
        let callback = this.wishlistCallback;
        let section = this;
        wishlistAddButton.hidden = !gameCardData.isWishlisted;
        wishlistAddButton.addEventListener("click", () => callback(section, index, gameCardData.gameId, gameCardData.title, true));
        wishlistRemoveButton.hidden = gameCardData.isWishlisted;
        wishlistRemoveButton.addEventListener("click", () => callback(section, index, gameCardData.gameId, gameCardData.title, false));
        
        for (let i = 0; i < gameCardData.platforms.length; i++) {
            let newChip = platformChip.cloneNode(true);
            let newChipText = newChip.querySelector("p");

            newChipText.innerHTML = gameCardData.platforms[i];
            cardPlatformContainer.appendChild(newChip);
        }
        
        platformChip.remove();

        this.cardContainer.appendChild(card);
        return card;
    }

    updateCardWishlistStatus(section, index, isWishlisted) {
        console.log(section);
        console.log(index);
        console.log(this);
        let card = section.cards[index];
        let wishlistAddButton = card.querySelector(".wishlist-add");
        let wishlistRemoveButton = card.querySelector(".wishlist-remove");
        wishlistAddButton.hidden = isWishlisted;
        wishlistRemoveButton.hidden = !isWishlisted;
    }
}