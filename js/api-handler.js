const gateway = "http://localhost:8000"

const loginEndpoint = `${gateway}/login/`;
const signupEndpoint = `${gateway}/signup/`;
const logoutEndpoint = `${gateway}/logout/`;
const usernameEndpoint = `${gateway}/username/`;
const wishlistEndpoint = `${gateway}/wishlist/index/`;

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
        console.log(usernameRequest);

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
        console.log(wishlistRequest);

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