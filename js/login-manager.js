const usernameKey = "username";
const client = new APIHandler();
const detailsUrl = "./details.html";
let platformManager = null;
let notificationManager = null;
let loginManager = null;

class NotificationManager {
    constructor() {
        this.banner = document.getElementById("notification-banner");
        this.bannerText = this.banner.querySelector("p");
        this.bannerDuration = 3000;
        this.isBannerShown = false;
        this.hideBanner();
    }

    showBannerTemporarily(message) {
        this.bannerText.innerHTML = message;
        if (!this.isBannerShown) {
            setTimeout(this.hideBanner.bind(this), this.bannerDuration);
        }
        this.showBanner();
    }

    showBanner() {
        this.isBannerShown = true;
        this.banner.classList.add("notification-banner-shown");
        this.banner.classList.remove("notification-banner-hidden");
    }

    hideBanner() {
        this.isBannerShown = false;
        this.banner.classList.add("notification-banner-hidden");
        this.banner.classList.remove("notification-banner-shown");
    }
}

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
                if (response.status === 200) {
                    this.isLoggedIn = true;
                    this.username = response.username;
                    callback(true, response.username);
                }
                else {
                    this.isLoggedIn = false;
                    this.username = "";
                    sessionStorage.removeItem(usernameKey);
                    callback(false, "");
                }
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

        this.playstationId = "storefront_sonyplaystationstore";
        this.xboxId = "storefront_xboxstore";
        this.switchId = "storefront_nintendostore";
        this.steamId = "storefront_steam";
        this.epicId = "storefront_epicgamesstore";
    }

    isPreferredPlatform(storefrontId) {
        if (this.isPlaystationPreferred && storefrontId === this.playstationId) {
            return true;
        }
        else if (this.isXboxPreferred && storefrontId === this.xboxId) {
            return true;
        }
        else if (this.isSwitchPreferred && storefrontId === this.switchId) {
            return true;
        }
        else if (this.isPCPreferred && (storefrontId === this.steamId || storefrontId === this.epicId)) {
            return true;
        }
        return false;
    }

    getPlatformsFromServer(onSuccess) {
        // Get preferred platforms from server
        this.client.getPreferredPlatforms(response => {
            if (response.status === 200 || response.status === 304) {
                this.onGetPreferredPlatforms(response);
                onSuccess();
            }
            else {
                // This can happen if the user is not logged in.
                console.log("Failed to load preferred platforms");
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
            else if (store === this.steamId || store === this.epicId) {
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
            stores.push(this.steamId);
            stores.push(this.epicId);
        }

        this.client.setPreferredPlatforms(stores, response => {
            if (response.status === 200) {
                console.log("Updated platforms successfully");
                // Refresh the page to repopulate the game lists.
                window.location = window.location;
            }
            else {
                notificationManager.showBannerTemporarily(errorMessages.platformError);
            }
        });
    }

    numberOfPreferredPlatforms() {
        let number = 0;
        if (this.isPlaystationPreferred) {
            number++;
        }
        if (this.isXboxPreferred) {
            number++;
        }
        if (this.isSwitchPreferred) {
            number++;
        }
        if (this.isPCPreferred) {
            number++;
        }
        return number;
    }
}

class HeaderPresenter {
    constructor() {
        this.loginManager = new LoginManager();
        loginManager = this.loginManager;
        this.platformManager = new PreferredPlatformManager();
        platformManager = this.platformManager;

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
            this.setupPlatformButtons();
        }
        else {
            console.log("Nobody signed in");
            this.usernameObject.classList.add("hidden");
            this.logoutButton.hidden = true;
            this.playstationToggle.hidden = true;
            this.xboxToggle.hidden = true;
            this.switchToggle.hidden = true;
            this.pcToggle.hidden = true;
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
            if (this.platformManager.isPlaystationPreferred && this.platformManager.numberOfPreferredPlatforms() <= 1) {
                notificationManager.showBannerTemporarily(headerMessages.onePlatform);
                return;
            }
            this.platformManager.isPlaystationPreferred = !this.platformManager.isPlaystationPreferred;
            this.platformManager.updatePreferences();
            this.updatePlatformButtonState();
        });
        this.xboxToggle.addEventListener("click", () => {
            if (this.platformManager.isXboxPreferred && this.platformManager.numberOfPreferredPlatforms() <= 1) {
                notificationManager.showBannerTemporarily(headerMessages.onePlatform);
                return;
            }
            this.platformManager.isXboxPreferred = !this.platformManager.isXboxPreferred;
            this.platformManager.updatePreferences();
            this.updatePlatformButtonState();
        });
        this.switchToggle.addEventListener("click", () => {
            if (this.platformManager.isSwitchPreferred && this.platformManager.numberOfPreferredPlatforms() <= 1) {
                notificationManager.showBannerTemporarily(headerMessages.onePlatform);
                return;
            }
            this.platformManager.isSwitchPreferred = !this.platformManager.isSwitchPreferred;
            this.platformManager.updatePreferences();
            this.updatePlatformButtonState();
        });
        this.pcToggle.addEventListener("click", () => {
            if (this.platformManager.isPCPreferred && this.platformManager.numberOfPreferredPlatforms() <= 1) {
                notificationManager.showBannerTemporarily(headerMessages.onePlatform);
                return;
            }
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

function main() {
    notificationManager = new NotificationManager();
}

window.addEventListener("load", main);