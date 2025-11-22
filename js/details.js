class GameDetailsScreen {
    constructor() {
        this.headerPresenter = new HeaderPresenter();
        this.headerPresenter.checkLogin();

        this.client = new APIHandler();
    }

    populateDetails() {
        this.client.getGameDetails("691bca19b8cab703f514e754", response => {
            if (response.status === 200) {
                const presenter = new GameDetailsPresenter();
                const gameDetailsData = gameDetailsToDetailsScreen(response);
                const pricingList = gamePricingToDetailsScreen(response);

                presenter.setGameDetails(gameDetailsData);
                pricingList.forEach(data => {
                    presenter.addPlatformCard(data);
                })

                presenter.removeTempObjects();
            }
        })
    }
}

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
        pricingCard.querySelector(".game-price").innerHTML = `$${gamePricingData.price}`;
        pricingCard.querySelector(".game-original-price").innerHTML = `Original price: $${gamePricingData.originalPrice}`;
        pricingCard.querySelector(".game-lowest-price").innerHTML = `Lowest ever: $${gamePricingData.lowestPrice}`;
        pricingCard.querySelector(".game-deal-ending").innerHTML = `Deal ends ${gamePricingData.dealEnding}`;
        pricingCard.querySelector(".game-deal-link").innerHTML = `Go to ${gamePricingData.storefrontName} Store`;
        pricingCard.querySelector(".game-deal-link").href = gamePricingData.storefrontLink;
        this.pricingContainer.appendChild(pricingCard);
    }

    removeTempObjects() {
        this.pricingCardTemplate.remove();
        this.platformChipTemplate.remove();
    }
}

function main() {
    const detailsScreen = new GameDetailsScreen();
    detailsScreen.populateDetails();
}

window.addEventListener("load", main);