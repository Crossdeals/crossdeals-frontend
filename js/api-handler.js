const gateway = "http://localhost:8000"

const loginEndpoint = `${gateway}/login/`;
const signupEndpoint = `${gateway}/signup/`;
const logoutEndpoint = `${gateway}/logout/`;

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

    signup(username, password, securityQuestion, securityAnswer, responseCallback) {
        const signupDetails = new SignupRequestDetails(username, password, securityQuestion, securityAnswer);

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