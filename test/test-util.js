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

describe('Util: gameListToHomeScreen', () => {
  let apiGameList = homeScreenData;
  it('Should convert properly using wishlist data from response', () => {
    chai.expect(gameListToHomeScreen(
      "Custom Header",
      apiGameList,
      false
    )).to.eql({

    })
  });
})