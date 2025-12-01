class HomeScreen {
    constructor() {
        this.client = new APIHandler();
        this.headerPresenter = new HeaderPresenter();
        this.headerPresenter.checkLogin();
        this.featuredPresenter = new FeaturedGamePresenter();
        this.populateFeaturedGame();

        this.homeScreenData = [];
    }

    populateFeaturedGame() {
        this.client.getFeaturedGameDetails(response => {
            if (response.status === 200) {
                this.featuredPresenter.populateFeaturedGame(response);
            }
            else {
                notificationManager.showBannerTemporarily(errorMessages.featuredGameError);
                console.log("Failed to retrieve featured game details");
            }
        })
    }

    getWishlist() {
        let username = this.headerPresenter.getUsername();
        this.client.getWishlist(username, response => {
            if (response.status === 200 || response.status === 304) {
                this.homeScreenData.push(gameListToHomeScreen(mainHeaders.yourWishlist, response, true));
                this.getHomeScreenGames();
            }
            else {
                // This will happen if the user is not logged in.
                console.log("Failed to retrieve wishlist");
                this.getHomeScreenGames();
            }
        });
    }

    getHomeScreenGames() {
        this.client.getHomeScreenGames(response => {
            if (response.status === 200 || response.status === 304) {
                this.homeScreenData.push(gameListToHomeScreen(mainHeaders.featuredDeals, response, false));
                let sectionListData = new GameCardSectionListData(this.homeScreenData);
                let presenter = new GameSectionsPresenter(sectionListData, this.editWishlist.bind(this));
            }
            else {
                notificationManager.showBannerTemporarily(errorMessages.featuredSalesError);
            }
        })
    }

    editWishlist(section, index, gameId, title, isAdding) {
        let username = this.headerPresenter.getUsername();
        if (isAdding) {
            this.client.addToWishlist(username, title, response => {
                if (response.status === 200) {
                    section.updateCardWishlistStatus(section, index, true);
                    notificationManager.showBannerTemporarily(mainMessages.addSuccessful);
                    console.log("Wishlist add success");
                }
                else {
                    notificationManager.showBannerTemporarily(errorMessages.wishlistError);
                    console.log("Failed to add to wishlist");
                }
            })
        }
        else {
            this.client.removeFromWishlist(gameId, response => {
                if (response.status === 200) {
                    section.updateCardWishlistStatus(section, index, false);
                    notificationManager.showBannerTemporarily(mainMessages.removeSuccessful);
                    console.log("Wishlist remove success")
                }
                else {
                    notificationManager.showBannerTemporarily(errorMessages.wishlistError);
                    console.log("Failed to remove from wishlist");
                }
            })
        }
    }
}

function main() {
    const homeScreen = new HomeScreen();
    homeScreen.getWishlist();
}

window.addEventListener("load", main);