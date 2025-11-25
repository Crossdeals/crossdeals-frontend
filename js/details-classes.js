class GameDetailsData {
    constructor(id, title, publisher, year, platforms, description, isWishlisted) {
        this.id = id;
        this.title = title;
        this.publisher = publisher;
        this.year = year;
        this.platforms = platforms;
        this.description = description;
        this.isWishlisted = isWishlisted;
    }
}

class GamePricingData {
    constructor(gameId, storefrontId, platform, price, originalPrice, lowestPrice, dealEnding, storefrontName, storefrontLink) {
        this.gameId = gameId;
        this.storefrontId = storefrontId;
        this.platform = platform;
        this.price = price;
        this.originalPrice = originalPrice;
        this.lowestPrice = lowestPrice;
        this.dealEnding = dealEnding;
        this.storefrontName = storefrontName;
        this.storefrontLink = storefrontLink;
    }
}