const usernameKey = "username";

function getUsername() {
    const apiHandler = new APIHandler();

    if (sessionStorage.getItem(usernameKey)) {
        apiHandler.username(sessionStorage.getItem(usernameKey), response => {
            document.getElementById("username").innerHTML = response.username;
        })
    }
    else {
        console.log("Nobody signed in");
    }
}

function signup() {
    window.location = "signup.html";
}

function login() {
    window.location = "login.html";
}

function logout() {
    const apiHandler = new APIHandler();

    apiHandler.logout(response => {
        sessionStorage.removeItem(usernameKey);
        window.location = window.location;
    })
}

function main() {
    console.log("Hello world!");
    getUsername();

    document.getElementById("logout").addEventListener("click", logout);
    document.getElementById("login").addEventListener("click", login);
    document.getElementById("signup").addEventListener("click", signup);
}

window.addEventListener("load", main);