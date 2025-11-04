class GameDetailsData {
    constructor(id, title, publisher, year, platforms, description) {
        this.id = id;
        this.title = title;
        this.publisher = publisher;
        this.year = year;
        this.platforms = platforms;
        this.description = description;
    }
}

class GamePricingData {
    constructor(id, platform, price, originalPrice, lowestPrice, dealEnding) {
        this.id = id;
        this.platform = platform;
        this.price = price;
        this.originalPrice = originalPrice;
        this.lowestPrice = lowestPrice;
        this.dealEnding = dealEnding;
    }
}