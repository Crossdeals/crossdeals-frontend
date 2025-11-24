const usernameKey = "username";
const client = new APIHandler();
const detailsUrl = "./details.html";

class LoginManager {
    constructor() {
        this.isLoggedIn = false;
        this.username = "";
    }

    getUsername() {
        return this.username;
    }

    checkLogin(callback) {
        if (sessionStorage.getItem(usernameKey)) {
            client.username(sessionStorage.getItem(usernameKey), response => {
                this.isLoggedIn = true;
                this.username = response.username;
                callback(true, response.username);
            })
        }
        else {
            this.isLoggedIn = false;
            this.username = "";
            callback(false, "");
        }
    }
}

class PreferredPlatformManager {
    constructor() {
        this.client = new APIHandler();

        this.isPlaystationPreferred = true;
        this.isXboxPreferred = true;
        this.isSwitchPreferred = true;
        this.isPCPreferred = true;

        // TODO: Add the _ids here after hooking up with BE
        this.playstationId = "6923f542173e60b736aa1769";
        this.xboxId = "6923f542173e60b736aa1766";
        this.switchId = "6923f542173e60b736aa176c";
        this.pcId = "6923f542173e60b736aa175e"; // Steam only
    }

    getPlatformsFromServer(onSuccess) {
        // Get preferred platforms from server
        this.client.getPreferredPlatforms(response => {
            if (response.status === 200 || response.status === 304) {
                this.onGetPreferredPlatforms(response);
                onSuccess();
            }
        })
    }

    onGetPreferredPlatforms(stores) {
        this.isPlaystationPreferred = false;
        this.isXboxPreferred = false;
        this.isSwitchPreferred = false;
        this.isPCPreferred = false;

        stores.forEach(store => {
            if (store === this.playstationId) {
                this.isPlaystationPreferred = true;
            }
            else if (store === this.xboxId) {
                this.isXboxPreferred = true;
            }
            else if (store === this.switchId) {
                this.isSwitchPreferred = true;
            }
            else if (store === this.pcId) {
                this.isPCPreferred = true;
            }
            else {
                console.log(`Unknown store ID: ${store}`);
            }
        });
    }

    updatePreferences() {
        // Update the server's preferred platforms
        const stores = [];

        if (this.isPlaystationPreferred) {
            stores.push(this.playstationId);
        }
        if (this.isXboxPreferred) {
            stores.push(this.xboxId);
        }
        if (this.isSwitchPreferred) {
            stores.push(this.switchId);
        }
        if (this.isPCPreferred) {
            stores.push(this.pcId);
        }

        this.client.setPreferredPlatforms(stores, response => {
            if (response.status === 200) {
                console.log("Updated platforms successfully");
                // Refresh the page to repopulate the game lists.
                window.location = window.location;
            }
        });
    }
}

class HeaderPresenter {
    constructor() {
        this.loginManager = new LoginManager();
        this.platformManager = new PreferredPlatformManager();

        // Home
        this.homeButton = document.getElementById("logo");
        this.homeButton.addEventListener("click", this.goHome);

        // Auth
        this.loginButton = document.getElementById("login");
        this.logoutButton = document.getElementById("logout");
        this.signupButton = document.getElementById("signup");
        this.usernameObject = document.getElementById("username-container");
        this.usernameText = document.getElementById("username");
        this.setupAuthLinks();

        // Search
        this.searchBar = document.getElementById("searchbar");
        this.searchBar.addEventListener("keydown", this.search.bind(this));

        // Platforms
        this.playstationToggle = document.getElementById("ps");
        this.xboxToggle = document.getElementById("xbox");
        this.switchToggle = document.getElementById("sw");
        this.pcToggle = document.getElementById("pc");
        this.setupPlatformButtons();
        this.platformManager.getPlatformsFromServer(this.updatePlatformButtonState.bind(this));
    }

    checkLogin() {
        this.loginManager.checkLogin(this.onLoginCheckComplete.bind(this));
    }

    getUsername() {
        return this.loginManager.getUsername();
    }

    onLoginCheckComplete(isLoggedIn, username) {
        if (isLoggedIn) {
            this.usernameText.innerHTML = username;
            this.loginButton.hidden = true;
            this.signupButton.hidden = true;
        }
        else {
            console.log("Nobody signed in");
            this.usernameObject.classList.add("hidden");
            this.logoutButton.hidden = true;
        }
    }

    setupAuthLinks() {
        this.logoutButton.addEventListener("click", this.logout);
        this.loginButton.addEventListener("click", this.login);
        this.signupButton.addEventListener("click", this.signup);
    }

    goHome() {
        window.location = "index.html";
    }

    signup() {
        window.location = "signup.html";
    }

    login() {
        window.location = "login.html";
    }

    logout() {
        client.logout(response => {
            // TODO: check for errors here
            sessionStorage.removeItem(usernameKey);
            window.location = window.location;
        })
    }

    search(keyboardEvent) {
        if (keyboardEvent.key === "Enter") {
            // TODO: Validating the input.
            const searchValue = this.searchBar.value;
            window.location = detailsUrl.concat(`?title=${searchValue}`)
        }
    }

    setupPlatformButtons() {
        this.playstationToggle.addEventListener("click", () => {
            this.platformManager.isPlaystationPreferred = !this.platformManager.isPlaystationPreferred;
            this.platformManager.updatePreferences();
            this.updatePlatformButtonState();
        });
        this.xboxToggle.addEventListener("click", () => {
            this.platformManager.isXboxPreferred = !this.platformManager.isXboxPreferred;
            this.platformManager.updatePreferences();
            this.updatePlatformButtonState();
        });
        this.switchToggle.addEventListener("click", () => {
            this.platformManager.isSwitchPreferred = !this.platformManager.isSwitchPreferred;
            this.platformManager.updatePreferences();
            this.updatePlatformButtonState();
        });
        this.pcToggle.addEventListener("click", () => {
            this.platformManager.isPCPreferred = !this.platformManager.isPCPreferred;
            this.platformManager.updatePreferences();
            this.updatePlatformButtonState();
        });
    }

    updatePlatformButtonState() {
        if (this.platformManager.isPlaystationPreferred) {
            this.playstationToggle.classList.remove("platform-toggle-off")
        }
        else {
            this.playstationToggle.classList.add("platform-toggle-off");
        }

        if (this.platformManager.isXboxPreferred) {
            this.xboxToggle.classList.remove("platform-toggle-off")
        }
        else {
            this.xboxToggle.classList.add("platform-toggle-off");
        }
        
        if (this.platformManager.isSwitchPreferred) {
            this.switchToggle.classList.remove("platform-toggle-off")
        }
        else {
            this.switchToggle.classList.add("platform-toggle-off");
        }
        
        if (this.platformManager.isPCPreferred) {
            this.pcToggle.classList.remove("platform-toggle-off")
        }
        else {
            this.pcToggle.classList.add("platform-toggle-off");
        }
    }
}