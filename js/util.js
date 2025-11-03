let headers = ['Your Wishlist']

// Converts server's GET /index response to frontend data format.
function wishlistToHomeScreen(wishlistData) {
    let displayData = [];

    headers.forEach(header => {
        let headerGameList = [];
        wishlistData.forEach(gameData => {
            headerGameList.push(gameToHomeScreen(gameData));
        });
        displayData.push({
            "header": header,
            "data": headerGameList
        });
    });

    return displayData;
}

// Converts one game entry from the server's GET /index response to one game entry in frontend data format.
function gameToHomeScreen(apiGameData) {
    let displayData = {};
    displayData["image"] = "../images/mw19-placeholder.png";
    displayData["title"] = apiGameData.title;

    // Get best price and platform
    let bestPrice = 9000;
    let bestPricePlatforms = ["None"];

    apiGameData.deals.forEach(storePrice => {
        if (storePrice.currentPrice < bestPrice) {
            bestPrice = storePrice.currentPrice;
            bestPricePlatforms = storePrice.storefront.platforms;
        }
        else if (storePrice.currentPrice == bestPrice) {
            bestPricePlatforms.concat(storePrice.storefront.platforms);
        }
    })

    displayData["price"] = bestPrice;
    displayData["platforms"] = bestPricePlatforms;

    return displayData;
}