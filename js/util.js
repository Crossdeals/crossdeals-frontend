function unixTimestampToDisplayString(timestamp) {
    const month = timestamp.slice(5, 7);
    const date = timestamp.slice(8, 10);
    return `${month}/${date}`;
}

function floatToPercentageString(floatPercentage) {
    const multiplied = floatPercentage * 100;
    const rounded = Math.round(multiplied);
    return `${rounded}%`;
}

function dollarAmountFormatted(dollarsFloat) {
    return `$${dollarsFloat.toFixed(2)}`;
}

// Converts server's GET /index response to frontend data format.
function gameListToHomeScreen(header, apiGameList, isAlreadyWishlisted) {
    let displayData = {};
    let headerGameList = [];
    apiGameList.forEach(gameData => {
        if (isAlreadyWishlisted) {
            gameData["isWishlisted"] = true;
        }
        headerGameList.push(gameToHomeScreen(gameData));
    });
    displayData = {
        "header": header,
        "data": headerGameList
    };

    return displayData;
}

// Converts one game entry from the server's GET /index response to one game entry in frontend data format.
function gameToHomeScreen(apiGameData) {
    let displayData = {};
    displayData["gameId"] = apiGameData._id;
    displayData["image"] = "../images/mw19-placeholder.png";
    displayData["title"] = apiGameData.title;
    displayData["isWishlisted"] = apiGameData.isWishlisted;

    // Get best price and platform
    let bestPrice = 9000;
    let bestPriceAllPlatforms = 9000;

    apiGameData.deals.forEach(storePrice => {
        if (storePrice.currentPrice < bestPrice) {
            if (platformManager.isPreferredPlatform(storePrice.storefront._id)) {
                bestPrice = storePrice.currentPrice;
            }
            else {
                bestPriceAllPlatforms = storePrice.currentPrice;
            }
        }
    })

    if (bestPrice !== 9000) {
        displayData["price"] = bestPrice;
    }
    else {
        displayData["price"] = bestPriceAllPlatforms;
    }

    // Get a list of all platforms for this game.
    const platforms = [];
    for (let i = 0; i < apiGameData.deals.length; i++) {
        const dealData = apiGameData.deals[i];
        for (let j = 0; j < dealData.storefront.platforms.length; j++) {
            const platform = dealData.storefront.platforms[j];
            platforms.push(platform);
        }
    }
    displayData["platforms"] = platforms;

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
        "Unknown Description",
        apiGameData.isWishlisted
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
            dealData.storefront._id,
            platform,
            dealData.currentPrice,
            dealData.originalPrice,
            dealData.bestPrice,
            unixTimestampToDisplayString(dealData.dealEndDate),
            dealData.storefront.name,
            dealData.storefront.url
        );

        gamePricingDataList.push(pricingData);
    }

    return gamePricingDataList;
}

function getLowestPriceDetails(apiGameData) {
    let lowestPrice = 99999;
    let originalPrice = 99999;
    let salePercentage = 1.0;
    let endDate = "00/00";

    for (let i = 0; i < apiGameData.deals.length; i++) {
        const dealData = apiGameData.deals[i];

        if (platformManager.isPreferredPlatform(dealData.storefront._id) && dealData.currentPrice < lowestPrice) {
            lowestPrice = dealData.currentPrice;
            originalPrice = dealData.originalPrice;
            salePercentage = 1.0 - (lowestPrice / originalPrice);
            endDate = unixTimestampToDisplayString(dealData.dealEndDate);
        }
    }

    return {
        "lowestPrice": lowestPrice,
        "originalPrice": originalPrice,
        "salePercentage": salePercentage,
        "endDate": endDate
    };
}