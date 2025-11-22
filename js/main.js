class HomeScreen {
    constructor() {
        this.client = new APIHandler();
        this.headerPresenter = new HeaderPresenter();
        this.headerPresenter.checkLogin();
    }

    getWishlist() {
        let username = this.headerPresenter.getUsername();
        this.client.getWishlist(username, response => {
            if (response.status === 200) {
                let homeScreenData = wishlistToHomeScreen(response);
                let sectionListData = new GameCardSectionListData(homeScreenData);
                let presenter = new GameSectionsPresenter(sectionListData, this.editWishlist.bind(this));
            }
            else {
                console.log("Failed to retrieve wishlist");
            }
        });
    }

    editWishlist(section, index, gameId, title, isAdding) {
        let username = this.headerPresenter.getUsername();
        if (isAdding) {
            this.client.addToWishlist(username, title, response => {
                if (response.status === 200) {
                    section.updateCardWishlistStatus(section, index, true);
                    console.log("Wishlist add success");
                }
                else {
                    console.log("Failed to add to wishlist");
                }
            })
        }
        else {
            this.client.removeFromWishlist(gameId, response => {
                if (response.status === 200) {
                    section.updateCardWishlistStatus(section, index, false);
                    console.log("Wishlist remove success")
                }
                else {
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