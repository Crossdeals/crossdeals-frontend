const usernameKey = "username";
const dummyData = [
    {
        "header": "Dummy Data 1",
        "data": [
            {
                "image": "../images/mw19-placeholder.png",
                "title": "Placeholder game",
                "price": 18.99,
                "platforms": [
                    "Xbox",
                    "PS"
                ]
            }
        ]
    },
    {
        "header": "Dummy Data 2",
        "data": [
            {
                "image": "../images/mw19-placeholder.png",
                "title": "Placeholder game",
                "price": 27.99,
                "platforms": [
                    "Xbox",
                    "PS"
                ]
            }
        ]
    }
];

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

function setupLinks() {
    document.getElementById("logout").addEventListener("click", logout);
    document.getElementById("login").addEventListener("click", login);
    document.getElementById("signup").addEventListener("click", signup);
}

function populateData() {
    // TODO: Add a client class and access data
    let sectionListData = new GameCardSectionListData(dummyData);
    let presenter = new HomeScreenPresenter(sectionListData);
}

function main() {
    getUsername();
    setupLinks();
    populateData();
}

window.addEventListener("load", main);