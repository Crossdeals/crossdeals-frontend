class GameDetailsScreen {
    constructor() {
        this.headerPresenter = new HeaderPresenter();
        this.headerPresenter.checkLogin();

        this.gameDetailsPresenter = null;

        this.client = new APIHandler();

        const urlParams = new URLSearchParams(window.location.search);
        this.title = urlParams.get("title");
        this.gameId = null;
    }

    populateDetails() {
        this.client.searchGame(this.title, response => {
            if (response.status === 200) {
                this.gameDetailsPresenter = new GameDetailsPresenter(this.addToWishlist.bind(this), this.removeFromWishlist.bind(this));
                const gameDetailsData = gameDetailsToDetailsScreen(response[0]);
                const pricingList = gamePricingToDetailsScreen(response[0]);

                this.gameId = gameDetailsData.id;
                this.gameDetailsPresenter.updateWishlistButtons(gameDetailsData.isWishlisted);

                this.gameDetailsPresenter.setGameDetails(gameDetailsData);
                pricingList.forEach(data => {
                    if (platformManager.isPreferredPlatform(data.storefrontId)) {
                        this.gameDetailsPresenter.addPlatformCard(data);
                    }
                })

                this.gameDetailsPresenter.removeTempObjects();
            }
            else {
                this.gameDetailsPresenter = new GameDetailsPresenter(null, null);
                this.gameDetailsPresenter.hideMainDetailsContainer(this.title);
            }
        })
    }
    
    addToWishlist() {
        this.client.addToWishlist(loginManager.getUsername(), this.title, response => {
            if (response.status === 200) {
                notificationManager.showBannerTemporarily("Added game to wishlist!")
                this.gameDetailsPresenter.updateWishlistButtons(true);
            }
        })
    }
    
    removeFromWishlist() {
        this.client.removeFromWishlist(this.gameId, response => {
            if (response.status === 200) {
                notificationManager.showBannerTemporarily("Removed game from wishlist!")
                this.gameDetailsPresenter.updateWishlistButtons(false);
            }
        })
    }
}

class GameDetailsPresenter {
    constructor(addCallback, removeCallback) {
        this.titleText = document.getElementById("game-title");
        this.publisherText = document.getElementById("game-publisher-year");
        this.platformChipTemplate = document.querySelector(".platform-chip");
        this.platformChipContainer = document.getElementById("platform-container");
        this.descriptionText = document.getElementById("game-description");
        this.pricingContainer = document.getElementById("game-pricing-container");
        this.pricingCardTemplate = document.querySelector(".game-details");
        this.addToWishlistButton = document.getElementById("add-wishlist");
        this.removeFromWishlistButton = document.getElementById("remove-wishlist");
        this.averageRatingText = document.getElementById("review-average-rating");
        this.mainDetailsContainer = document.getElementById("main-content-container");

        this.setupButtons(addCallback, removeCallback);
    }

    updateWishlistButtons(isWishlisted) {
        if (isWishlisted) {
            this.addToWishlistButton.classList.add("hidden");
            this.removeFromWishlistButton.classList.remove("hidden");
        }
        else {
            this.addToWishlistButton.classList.remove("hidden");
            this.removeFromWishlistButton.classList.add("hidden");
        }
    }

    setupButtons(addCallback, removeCallback) {
        this.addToWishlistButton.addEventListener("click", () => {
            addCallback();
        })
        this.removeFromWishlistButton.addEventListener("click", () => {
            removeCallback();
        })
    }

    hideMainDetailsContainer(title) {
        this.mainDetailsContainer.hidden = true;
        this.titleText.innerHTML = "Game Not Found";
        this.publisherText.innerHTML = `${title} is not a game in our database. Please search for another game!`;
        this.platformChipTemplate.classList.add("hidden");
    }

    setGameDetails(gameDetailsData) {
        this.titleText.innerHTML = gameDetailsData.title;
        this.publisherText.innerHTML = `${gameDetailsData.publisher}, ${gameDetailsData.year}`;
        this.descriptionText.innerHTML = gameDetailsData.description;
        
        const platforms = [];
        for (let i = 0; i < gameDetailsData.platforms.length; i++) {
            let platform = gameDetailsData.platforms[i];
            if (platforms.includes(platform)) {
                continue;
            }
            platforms.push(platform);
            let platformChip = this.platformChipTemplate.cloneNode(true);
            platformChip.querySelector("p").innerHTML = platform;
            this.platformChipContainer.appendChild(platformChip);
        }
    }

    addPlatformCard(gamePricingData) {
        let pricingCard = this.pricingCardTemplate.cloneNode(true);

        pricingCard.querySelector(".game-platform").innerHTML = gamePricingData.platform;
        pricingCard.querySelector(".game-price").innerHTML = dollarAmountFormatted(gamePricingData.price);
        pricingCard.querySelector(".game-original-price").innerHTML = `Original price: ${dollarAmountFormatted(gamePricingData.originalPrice)}`;
        pricingCard.querySelector(".game-lowest-price").innerHTML = `Lowest ever: ${dollarAmountFormatted(gamePricingData.lowestPrice)}`;
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