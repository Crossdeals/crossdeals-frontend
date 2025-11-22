const landingPageUrl = "./index.html";
const usernameKey = "username";

function submitFormData(formData) {
    let loginButton = document.getElementById("login");
    loginButton.setAttribute("disabled", "disabled");

    let apiHandler = new APIHandler();
    apiHandler.login(formData["username"], formData["password"], (response) => {
        loginButton.removeAttribute("disabled");
        let status = response["status"];
        if (status === 200) {
            sessionStorage.setItem(usernameKey, formData["username"]);
            window.location = landingPageUrl;
        }
        else {
            document.getElementById("error-message").innerHTML = loginMessages.unknownError;
        }
    });
}

function main() {
    const form = new Form(document.getElementById("login"), document.getElementById("error-message"));
    
    const usernameField = new FormField("username", document.getElementById("username"));
    usernameField.setValidator((input) => {
        if (input.trim().length === 0) {
            return loginMessages.emptyUsername;
        }
        else {
            return true;
        }
    })
    const passwordField = new FormField("password", document.getElementById("password"));
    passwordField.setValidator((input) => {
        if (input.trim().length === 0) {
            return loginMessages.emptyPassword;
        }
        else {
            return true;
        }
    })

    form.addField(usernameField);
    form.addField(passwordField);

    form.setOnSubmit(submitFormData);
}

window.addEventListener("load", main);
