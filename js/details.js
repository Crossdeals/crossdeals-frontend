class GameDetailsPresenter {
    constructor() {
        this.titleText = document.getElementById("game-title");
        this.publisherText = document.getElementById("game-publisher-year");
        this.platformChipTemplate = document.querySelector(".platform-chip");
        this.platformChipContainer = document.getElementById("platform-container");

        this.descriptionText = document.getElementById("game-description");
        
        this.pricingContainer = document.getElementById("game-pricing-container");
        this.pricingCardTemplate = document.querySelector(".game-details");

        this.averageRatingText = document.getElementById("review-average-rating");
    }

    setGameDetails(gameDetailsData) {
        this.titleText.innerHTML = gameDetailsData.title;
        this.publisherText.innerHTML = `${gameDetailsData.publisher}, ${gameDetailsData.year}`;
        this.descriptionText.innerHTML = gameDetailsData.description;
        
        for (let i = 0; i < gameDetailsData.platforms.length; i++) {
            let platform = gameDetailsData.platforms[i];
            let platformChip = this.platformChipTemplate.cloneNode(true);
            platformChip.querySelector("p").innerHTML = platform;
            this.platformChipContainer.appendChild(platformChip);
        }
    }

    addPlatformCard(gamePricingData) {
        let pricingCard = this.pricingCardTemplate.cloneNode(true);

        pricingCard.querySelector(".game-platform").innerHTML = gamePricingData.platform;
        pricingCard.querySelector(".game-price").innerHTML = gamePricingData.price;
        pricingCard.querySelector(".game-original-price").innerHTML = gamePricingData.originalPrice;
        pricingCard.querySelector(".game-lowest-price").innerHTML = gamePricingData.lowestPrice;
        pricingCard.querySelector(".game-deal-ending").innerHTML = gamePricingData.dealEnding;

        this.pricingContainer.appendChild(pricingCard);
    }

    removeTempObjects() {
        this.pricingCardTemplate.remove();
        this.platformChipTemplate.remove();
    }
}

function main() {
    let dummyDetails = new GameDetailsData(
        69,
        "Contemporary Warfare",
        "Artivision",
        "2019",
        ["PS", "Xbox"],
        "\"Section Six, going dark.\" The latest entry in the Call to Arms franchise, Contemporary Warfare, depicts warfare in the 21st century."
    )
    let dummyPSPricing = new GamePricingData(
        69,
        "PS",
        14.99,
        69.99,
        9.99,
        "07/17/25"
    )
    let dummyXboxPricing = new GamePricingData(
        69,
        "Xbox",
        19.99,
        69.99,
        4.99,
        "07/18/25"
    )

    let gameDetailsPresenter = new GameDetailsPresenter();
    gameDetailsPresenter.setGameDetails(dummyDetails);
    gameDetailsPresenter.addPlatformCard(dummyPSPricing);
    gameDetailsPresenter.addPlatformCard(dummyXboxPricing);
    gameDetailsPresenter.removeTempObjects();
}

window.addEventListener("load", main);