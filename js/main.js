const usernameKey = "username";

function getUsername() {
    const apiHandler = new APIHandler();

    if (sessionStorage.getItem(usernameKey)) {
        apiHandler.username(sessionStorage.getItem(usernameKey), response => {
            document.getElementById("username").innerHTML = response;
        })
    }
    else {
        console.log("Nobody signed in");
    }
}

function main() {
    console.log("Hello world!");
    getUsername();
}

window.addEventListener("load", main);