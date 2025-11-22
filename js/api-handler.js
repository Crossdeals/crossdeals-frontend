const gateway = "http://localhost:8000"

const loginEndpoint = `${gateway}/login/`;
const signupEndpoint = `${gateway}/signup/`;
const logoutEndpoint = `${gateway}/logout/`;
const usernameEndpoint = `${gateway}/username/`;
const wishlistEndpoint = `${gateway}/wishlist/index/`;
const wishlistAddEndpoint = `${gateway}/wishlist/add/`;
const wishlistRemoveEndpoint = `${gateway}/wishlist/remove/`;
const gameDetailsEndpoint = `${gateway}/games/`;

const dummyGameDataForTesting = {
    "_id": "691bca19b8cab703f514e754",
    "title": "Minecraft",
    "deals": [
        {
            "storefront": {
                "_id": "691bca19b8cab703f514e74b",
                "url": "www.sonystore.com",
                "name": "Sony Store",
                "platforms": [
                    "ps5"
                ],
                "__v": 0
            },
            "originalPrice": 99.99,
            "currentPrice": 59.99,
            "bestPrice": 39.99,
            "dealEndDate": "2025-11-11T00:00:00.000Z",
            "_id": "691bca19b8cab703f514e755"
        },
        {
            "storefront": {
                "_id": "691bca19b8cab703f514e74b",
                "url": "www.sonystore.com",
                "name": "Microsoft Store",
                "platforms": [
                    "xbox"
                ],
                "__v": 0
            },
            "originalPrice": 99.99,
            "currentPrice": 29.99,
            "bestPrice": 59.99,
            "dealEndDate": "2025-11-11T00:00:00.000Z",
            "_id": "691bca19b8cab703f514e755"
        }
    ],
    "__v": 0
}

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

    getGameDetails(gameId, responseCallback) {
        const dummyResponse = dummyGameDataForTesting;
        dummyResponse["status"] = 200;
        responseCallback(dummyResponse);
        return;

        const xhttp = new XMLHttpRequest();
        xhttp.withCredentials = true;
        let endpoint = gameDetailsEndpoint.concat(gameId);
        xhttp.open("GET", endpoint, true);
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