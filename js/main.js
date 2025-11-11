const usernameKey = "username";
const client = new APIHandler();
let homeScreen = null;

class HomeScreen {
    constructor() {
        this.loginButton = document.getElementById("login");
        this.logoutButton = document.getElementById("logout");
        this.signupButton = document.getElementById("signup");
        this.usernameObject = document.getElementById("username-container");
        this.usernameText = document.getElementById("username");

        this.setupLinks();
        this.getUsername();
    }

    setupLinks() {
        this.logoutButton.addEventListener("click", this.logout);
        this.loginButton.addEventListener("click", this.login);
        this.signupButton.addEventListener("click", this.signup);
    }

    getUsername() {
        if (sessionStorage.getItem(usernameKey)) {
            client.username(sessionStorage.getItem(usernameKey), response => {
                this.usernameText.innerHTML = response.username;
                this.loginButton.hidden = true;
                this.signupButton.hidden = true;
            })
        }
        else {
            console.log("Nobody signed in");
            this.usernameObject.classList.add("hidden");
            this.logoutButton.hidden = true;
        }
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

    editWishlist(section, index, title, isAdding) {
        let username = homeScreen.getUsername();
        if (isAdding) {
            client.addToWishlist(username, title, response => {
                if (response.status === 200) {
                    section.updateCardWishlistStatus(index, true);
                }
                else {
                    console.log("Failed to update wishlist status");
                }
            })
        }
        else {
            // TODO: Remove from wishlist
        }
    }

    signup() {
        window.location = "signup.html";
    }

    login() {
        window.location = "login.html";
    }

    logout() {
        client.logout(response => {
            sessionStorage.removeItem(usernameKey);
            window.location = window.location;
        })
    }
}

function main() {
    homeScreen = new HomeScreen();
    homeScreen.getWishlist();
}

window.addEventListener("load", main);