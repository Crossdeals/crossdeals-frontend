class GameDetailsScreen {
    constructor() {
        this.headerPresenter = new HeaderPresenter();
        this.headerPresenter.checkLogin();

        this.client = new APIHandler();
    }

    populateDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const title = urlParams.get("title");

        // TODO: get response from the server
        this.client.searchGame(title, response => {
            if (response.status === 200) {
                const presenter = new GameDetailsPresenter();
                const gameDetailsData = gameDetailsToDetailsScreen(response[0]);
                const pricingList = gamePricingToDetailsScreen(response[0]);

                presenter.setGameDetails(gameDetailsData);
                pricingList.forEach(data => {
                    if (platformManager.isPreferredPlatform(data.storefrontId)) {
                        presenter.addPlatformCard(data);
                    }
                })

                presenter.removeTempObjects();
            }
            else {
                const presenter = new GameDetailsPresenter();
                presenter.hideMainDetailsContainer(title);
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

        this.mainDetailsContainer = document.getElementById("main-content-container");
    }

    hideMainDetailsContainer(title) {
        this.mainDetailsContainer.hidden = true;
        this.titleText.innerHTML = "Game Not Found";
        this.publisherText.innerHTML = `${title} is not a game in our database. Please search for another game!`;
        this.platformChipTemplate.hidden = true;
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
        pricingCard.querySelector(".game-deal-link").innerHTML = `Go to ${gamePricingData.storefrontName}`;
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