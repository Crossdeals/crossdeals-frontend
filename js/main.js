const usernameKey = "username";

class HomeScreen {
    constructor() {
        this.loginButton = document.getElementById("login");
        this.logoutButton = document.getElementById("logout");
        this.signupButton = document.getElementById("signup");
        this.usernameObject = document.getElementById("username-container");
        this.usernameText = document.getElementById("username");

        this.setupLinks();

        this.client = new APIHandler();
        this.getUsername();
    }

    setupLinks() {
        this.logoutButton.addEventListener("click", logout);
        this.loginButton.addEventListener("click", login);
        this.signupButton.addEventListener("click", signup);
    }

    getUsername() {
        if (sessionStorage.getItem(usernameKey)) {
            this.apiHandler.username(sessionStorage.getItem(usernameKey), response => {
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

    signup() {
        window.location = "signup.html";
    }

    login() {
        window.location = "login.html";
    }

    logout() {
        this.apiHandler.logout(response => {
            sessionStorage.removeItem(usernameKey);
            window.location = window.location;
        })
    }
}

function populateData() {
    // TODO: Add a client class and access data
    let homeScreenData = wishlistToHomeScreen(apiData);
    let sectionListData = new GameCardSectionListData(homeScreenData);
    let presenter = new GameSectionsPresenter(sectionListData);
}

function main() {
    let homeScreen = new HomeScreen();
    populateData();
}

window.addEventListener("load", main);