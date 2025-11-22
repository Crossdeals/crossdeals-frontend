let headers = ['Your Wishlist']

function unixTimestampToDisplay(timestamp) {
    const month = timestamp.slice(5, 7);
    const date = timestamp.slice(8, 10);
    return `${month}/${date}`;
}

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
    displayData["gameId"] = apiGameData._id;
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

function gameDetailsToDetailsScreen(apiGameData) {
    // Get a list of all platforms for this game.
    const platforms = [];
    for (let i = 0; i < apiGameData.deals.length; i++) {
        const dealData = apiGameData.deals[i];
        for (let j = 0; j < dealData.storefront.platforms.length; j++) {
            const platform = dealData.storefront.platforms[j];
            platforms.push(platform);
        }
    }

    const gameDetailsData = new GameDetailsData(
        apiGameData._id,
        apiGameData.title,
        "Unknown Publisher",
        "Unknown Year",
        platforms,
        "Unknown Description"
    );

    return gameDetailsData;
}

function gamePricingToDetailsScreen(apiGameData) {
    const gamePricingDataList = [];

    for (let i = 0; i < apiGameData.deals.length; i++) {
        const dealData = apiGameData.deals[i];
        const platform = dealData.storefront.platforms[0];
        const pricingData = new GamePricingData(
            apiGameData._id,
            platform,
            dealData.currentPrice,
            dealData.originalPrice,
            dealData.bestPrice,
            unixTimestampToDisplay(dealData.dealEndDate),
            dealData.storefront.name,
            dealData.storefront.url
        );

        gamePricingDataList.push(pricingData);
    }

    return gamePricingDataList;
}