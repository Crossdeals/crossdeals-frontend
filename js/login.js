function goHome() {
    console.log("Going home");
    window.location = "../index.html";
}

function main() {
    console.log("Hello world!");

    document.getElementById("back").addEventListener("click", goHome);
}

window.addEventListener("load", main);