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
        this.image = data.image;
        this.title = data.title;
        this.price = data.price;
        this.platforms = data.platforms;
    }
}

class GameSectionsPresenter {
    constructor(sections) {
        this.sectionContainer = document.querySelector(".section-container");
        this.sectionObjectList = [];
        this.tempSection = document.querySelector(".deal-section");

        for (let i = 0; i < sections.sectionList.length; i++) {
            this.displaySection(sections.sectionList[i]);
        }

        this.removeTempObjects();
    }

    displaySection(section) {
        let sectionObject = new GameCardSection(section);
        sectionObject.appendToContainer(this.sectionContainer);
        this.sectionObjectList.concat(sectionObject);
    }

    removeTempObjects() {
        this.tempSection.remove();
    }
}

class GameCardSection {
    constructor(section) {
        this.sectionData = section;

        this.sectionTemplate = document.querySelector(".deal-section");
        this.section = this.sectionTemplate.cloneNode(true);
        this.sectionHeader = this.section.querySelector(".section-header");
        this.cardContainer = this.section.querySelector(".card-container");
        this.cardTemplate = this.section.querySelector(".deal-card");

        for (let i = 0; i < this.sectionData.data.length; i++) {
            this.addCard(this.sectionData.data[i]);
        }

        this.sectionHeader.innerHTML = this.sectionData.header;
        this.cardTemplate.remove();
    }

    appendToContainer(container) {
        container.appendChild(this.section);
    }

    addCard(gameCardData) {
        let card = this.cardTemplate.cloneNode(true);
        let cardImage = card.querySelector(".card-image");
        let cardTitle = card.querySelector(".card-title");
        let cardPrice = card.querySelector(".card-price");
        let cardPlatformContainer = card.querySelector(".card-platform-container");
        let platformChip = card.querySelector(".platform-chip");

        cardImage.src = gameCardData.image;
        cardTitle.innerHTML = gameCardData.title;
        cardPrice.innerHTML = gameCardData.price;

        
        for (let i = 0; i < gameCardData.platforms.length; i++) {
            let newChip = platformChip.cloneNode(true);
            let newChipText = newChip.querySelector("p");

            newChipText.innerHTML = gameCardData.platforms[i];
            cardPlatformContainer.appendChild(newChip);
        }
        
        platformChip.remove();

        this.cardContainer.appendChild(card);
    }
}