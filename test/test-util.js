describe('Util: unixTimestampToDisplayString', () => {
  it('Should format correctly', () => {
    chai.expect(unixTimestampToDisplayString("2025-12-26T00:00:00.000Z"))
      .to.eql("12/26");
  });

  it('Should format correctly with zeroes', () => {
    chai.expect(unixTimestampToDisplayString("2025-03-06T00:00:00.000Z"))
      .to.eql("03/06");
  });
});

describe('Util: floatToPercentageString', () => {
  it('Should format zero', () => {
    chai.expect(floatToPercentageString(0))
      .to.eql("0%");
  });

  it('Should format single digit', () => {
    chai.expect(floatToPercentageString(0.04))
      .to.eql("4%");
  });

  it('Should format double digit', () => {
    chai.expect(floatToPercentageString(0.56))
      .to.eql("56%");
  });

  it('Should format negatives', () => {
    chai.expect(floatToPercentageString(-0.33))
      .to.eql("-33%");
  });

  it('Should round numbers', () => {
    chai.expect(floatToPercentageString(-0.4666))
      .to.eql("-47%");
  });
})

describe('Util: dollarAmountFormatted', () => {
  it('Should format zero', () => {
    chai.expect(dollarAmountFormatted(0))
      .to.eql("$0.00");
  });

  it('Should format pennies', () => {
    chai.expect(dollarAmountFormatted(0.03))
      .to.eql("$0.03");
  });

  it('Should format dollars and pennies', () => {
    chai.expect(dollarAmountFormatted(6.03))
      .to.eql("$6.03");
  });

  it('Should round', () => {
    chai.expect(dollarAmountFormatted(6.035))
      .to.eql("$6.04");
  });
})

describe('Util: handleResponse', () => {
  it('Should callback with status', () => {
    handleResponse('{"hello": "value"}', 200, response => {
      chai.expect(response)
        .to.eql({ hello: "value", status: 200 });
    })
  });

  it('Should callback with error', () => {
    handleResponse('{InvalidJson::,: "value"}', 500, response => {
      chai.expect(response.status)
        .to.eql(-1);
      chai.expect(response.error)
        .to.be.an.instanceof(SyntaxError);
    })
  });
})

describe('Util: gameDetailsToDetailsScreen', () => {
  it('Should convert properly with no wishlist data', () => {
    chai.expect(gameDetailsToDetailsScreen(
      dummyGameData
    )).to.eql({
      "id": "692543fad58b61f4326764e3",
      "title": "Minecraft",
      "publisher": "Mojang Studios",
      "year": 2011,
      "platforms": [
        "PS5",
        "PC",
        "Xbox Series X|S"
      ],
      "description": "Minecraft is a sandbox game developed and published by Mojang Studios. Formally released on 18 November 2011 for personal computers following its initial public alpha release on 17 May 2009, it has been ported to numerous platforms, including mobile devices and various video game consoles.",
      "isWishlisted": undefined
    })
  });

  it('Should convert properly with wishlist data', () => {
    chai.expect(gameDetailsToDetailsScreen(
      dummyGameDataWishlisted
    )).to.eql({
      "id": "692543fad58b61f4326764e3",
      "title": "Minecraft",
      "publisher": "Mojang Studios",
      "year": 2011,
      "platforms": [
        "PS5",
        "PC",
        "Xbox Series X|S"
      ],
      "description": "Minecraft is a sandbox game developed and published by Mojang Studios. Formally released on 18 November 2011 for personal computers following its initial public alpha release on 17 May 2009, it has been ported to numerous platforms, including mobile devices and various video game consoles.",
      "isWishlisted": true
    })
  });
})

describe('Util: gamePricingToDetailsScreen', () => {
  it('Should convert properly', () => {
    chai.expect(gamePricingToDetailsScreen(
      dummyGameData
    )).to.eql([
      {
        "gameId": "692543fad58b61f4326764e3",
        "storefrontId": "storefront_sonyplaystationstore",
        "platform": "PS5",
        "price": 88.67,
        "originalPrice": 88.91,
        "lowestPrice": 88.67,
        "dealEnding": "12/26",
        "storefrontName": "Sony PlayStation Store",
        "storefrontLink": "https://store.playstation.com/en-ca/"
      },
      {
        "gameId": "692543fad58b61f4326764e3",
        "storefrontId": "storefront_epicgamesstore",
        "platform": "PC",
        "price": 11.97,
        "originalPrice": 81.91,
        "lowestPrice": 11.97,
        "dealEnding": "12/02",
        "storefrontName": "Epic Games Store",
        "storefrontLink": "https://store.epicgames.com/en-US/p/"
      },
      {
        "gameId": "692543fad58b61f4326764e3",
        "storefrontId": "storefront_xboxstore",
        "platform": "Xbox Series X|S",
        "price": 26.86,
        "originalPrice": 44.89,
        "lowestPrice": 26.86,
        "dealEnding": "12/25",
        "storefrontName": "Xbox Store",
        "storefrontLink": "https://www.xbox.com/en-CA/"
      }
    ])
  });

  it('Should return empty with no storefronts', () => {
    chai.expect(gamePricingToDetailsScreen(
      dummyGameDataNoStorefronts
    )).to.eql([])
  });
})