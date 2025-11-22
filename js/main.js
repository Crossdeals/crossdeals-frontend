const client = new APIHandler();
let homeScreen = null;

class HomeScreen {
    constructor() {
        this.headerPresenter = new HeaderPresenter();
        this.headerPresenter.checkLogin();
    }

    getWishlist() {
        let username = homeScreen.getUsername();
        client.getWishlist(username, response => {
            if (response.status === 200) {
                let homeScreenData = wishlistToHomeScreen(response);
                let sectionListData = new GameCardSectionListData(homeScreenData);
                let presenter = new GameSectionsPresenter(sectionListData, this.editWishlist);
            }
            else {
                console.log("Failed to retrieve wishlist");
            }
        });
    }

    editWishlist(section, index, gameId, title, isAdding) {
        let username = homeScreen.getUsername();
        if (isAdding) {
            client.addToWishlist(username, title, response => {
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
            client.removeFromWishlist(gameId, response => {
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
    homeScreen = new HomeScreen();
    homeScreen.getWishlist();
}

window.addEventListener("load", main);