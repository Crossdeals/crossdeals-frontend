const gateway = "http://localhost:8000"

const loginEndpoint = `${gateway}/login/`;
const signupEndpoint = `${gateway}/signup/`;
const logoutEndpoint = `${gateway}/logout/`;
const usernameEndpoint = `${gateway}/username/`;

const wishlistEndpoint = `${gateway}/wishlist/index/`;
const wishlistAddEndpoint = `${gateway}/wishlist/add/`;
const wishlistRemoveEndpoint = `${gateway}/wishlist/remove/`;
const preferredPlatformsEndpoint = `${gateway}/wishlist/storefront/`;

const gamesHomeScreenEndpoint = `${gateway}/games/`;
const gameDetailsEndpoint = `${gateway}/games/`;
const gameFeaturedEndpoint = `${gateway}/games/featured/`;
const gameSearchEndpoint = `${gateway}/games/search?title=`;

class APIHandler {
    constructor() {

    }

    login(username, password, responseCallback) {
        const loginDetails = new LoginAuthDetails(username, password);

        const xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        xhttp.open("POST", loginEndpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(loginDetails));
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                let response = JSON.parse(xhttp.responseText);
                response["status"] = xhttp.status;
                responseCallback(response);
            }
        }
    }

    signup(username, password, responseCallback) {
        const signupDetails = new SignupRequestDetails(username, password);

        const xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        xhttp.open("POST", signupEndpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(signupDetails));
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                let response = JSON.parse(xhttp.responseText);
                response["status"] = xhttp.status;
                responseCallback(response);
            }
        }
    }

    logout(responseCallback) {
        const xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        xhttp.open("GET", logoutEndpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                let response = JSON.parse(xhttp.responseText);
                response["status"] = xhttp.status;
                responseCallback(response);
            }
        }
    }

    username(username, responseCallback) {
        const usernameRequest = new UsernameRequestDetails(username);
        const xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        xhttp.open("POST", usernameEndpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(usernameRequest));
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                let response = JSON.parse(xhttp.responseText);
                response["status"] = xhttp.status;
                responseCallback(response);
            }
        }
    }

    getWishlist(username, responseCallback) {
        const wishlistRequest = new WishlistRequestDetails(username);
        const xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        xhttp.open("GET", wishlistEndpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(wishlistRequest));
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                let response = JSON.parse(xhttp.responseText);
                response["status"] = xhttp.status;
                responseCallback(response);
            }
        }
    }

    addToWishlist(username, title, responseCallback) {
        const wishlistAddRequest = new WishlistAddRequestDetails(username, title);

        const xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        xhttp.open("POST", wishlistAddEndpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(wishlistAddRequest));
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                let responseText = xhttp.responseText;
                let response = {
                    "message": responseText
                }
                response["status"] = xhttp.status;
                responseCallback(response);
            }
        }
    }

    removeFromWishlist(gameId, responseCallback) {
        const xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        let endpoint = wishlistRemoveEndpoint.concat(gameId);
        xhttp.open("DELETE", endpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                let responseText = xhttp.responseText;
                let response = {
                    "message": responseText
                }
                response["status"] = xhttp.status;
                responseCallback(response);
            }
        }
    }

    getGameDetailsDummy(gameId, responseCallback) {
        const dummyResponse = dummyGameData;
        dummyResponse["status"] = 200;
        responseCallback(dummyResponse);
        return;
    }

    getHomeScreenGamesDummy(responseCallback) {
        const dummyResponse = homeScreenData;
        dummyResponse["status"] = 200;
        responseCallback(dummyResponse);
        return;
    }

    getHomeScreenGames(responseCallback) {
        const xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        xhttp.open("GET", gamesHomeScreenEndpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                let response = JSON.parse(xhttp.response);
                response["status"] = xhttp.status;
                responseCallback(response);
            }
        }
    }

    getGameDetails(gameId, responseCallback) {
        const xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        let endpoint = gameDetailsEndpoint.concat(gameId);
        xhttp.open("GET", endpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                let response = JSON.parse(xhttp.response);
                response["status"] = xhttp.status;
                responseCallback(response);
            }
        }
    }

    getFeaturedGameDetails(responseCallback) {
        const xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        xhttp.open("GET", gameFeaturedEndpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                let response = JSON.parse(xhttp.response);
                response["status"] = xhttp.status;
                responseCallback(response);
            }
        }
    }

    searchGame(gameTitle, responseCallback) {
        const xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        const endpoint = gameSearchEndpoint.concat(gameTitle);
        xhttp.open("GET", endpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                let response = JSON.parse(xhttp.response);
                response["status"] = xhttp.status;
                responseCallback(response);
            }
        }
    }

    getPreferredPlatformsDummy(responseCallback) {
        const dummyResponse = dummyPreferredPlatformData;
        dummyResponse["status"] = 200;
        responseCallback(dummyResponse);
        return;
    }

    getPreferredPlatforms(responseCallback) {
        const xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        xhttp.open("GET", preferredPlatformsEndpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                let response = JSON.parse(xhttp.response);
                response["status"] = xhttp.status;
                responseCallback(response);
            }
        }
    }

    setPreferredPlatformsDummy(platformIds, responseCallback) {
        const dummyResponse = {"message": "Updated"};
        dummyResponse["status"] = 200;
        responseCallback(dummyResponse);
        return;
    }

    setPreferredPlatforms(platformIds, responseCallback) {
        const platformsRequest = new PreferredPlatformsRequestDetails(platformIds);

        const xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        xhttp.open("PATCH", preferredPlatformsEndpoint, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(platformsRequest));
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                let responseText = xhttp.responseText;
                let response = {
                    "message": responseText
                }
                response["status"] = xhttp.status;
                responseCallback(response);
            }
        }
    }
}

class LoginAuthDetails {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class SignupRequestDetails {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class UsernameRequestDetails {
    constructor(username) {
        this.username = username;
    }
}

class WishlistRequestDetails {
    constructor(username) {
        this.username = username;
    }
}

class WishlistAddRequestDetails {
    constructor(username, title) {
        this.username = username;
        this.title = title;
    }
}

class PreferredPlatformsRequestDetails {
    constructor(storeIds) {
        this.stores = storeIds;
    }
}