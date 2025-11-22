const usernameKey = "username";
const client = new APIHandler();

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

class HeaderPresenter {
    constructor() {
        this.loginManager = new LoginManager();

        this.loginButton = document.getElementById("login");
        this.logoutButton = document.getElementById("logout");
        this.signupButton = document.getElementById("signup");
        this.usernameObject = document.getElementById("username-container");
        this.usernameText = document.getElementById("username");
        this.setupLinks();
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

    setupLinks() {
        this.logoutButton.addEventListener("click", this.logout);
        this.loginButton.addEventListener("click", this.login);
        this.signupButton.addEventListener("click", this.signup);
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
}