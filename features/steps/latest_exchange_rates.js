const { Given, When, Then } = require("@cucumber/cucumber");
const { spec } = require("pactum");
const { expect } = require('chai');
const dayjs = require('dayjs')

let {setDefaultTimeout} = require('@cucumber/cucumber');

setDefaultTimeout(60 * 1000);

const APILAYER_API_KEY = 'axjJPl8nqDK3H6zvV2XXnfBpAXempyYp';

// Some example currency that will not be used in features
const SAMPLE_CURRENCY = 'AED';

Given("user fetch latest endpoint", function () {
    this.baseUrl = "https://api.apilayer.com/exchangerates_data/latest";
});

When("request is sent without params", async function () {
    const url = this.baseUrl;
    this.response = await spec()
        .get(url)
        .withRequestTimeout(60000)
        .withHeaders('apikey', APILAYER_API_KEY);
});

When("request is sent without API key", async function () {
    const url = this.baseUrl;
    this.response = await spec()
        .get(url)
        .withRequestTimeout(60000);
});

When("request is sent for {string} base", async function (base) {
    const url = `${this.baseUrl}?base=${base}`;
    this.response = await spec()
        .get(url)
        .withRequestTimeout(60000)
        .withHeaders('apikey', APILAYER_API_KEY);
});

When("request is sent for {string} base and {string} symbol", async function (base, symbol) {
    const url = `${this.baseUrl}?base=${base}&symbols=${symbol}`;
    this.response = await spec()
        .get(url)
        .withRequestTimeout(60000)
        .withHeaders('apikey', APILAYER_API_KEY);
});


Then("response should be successful for {string}\\/{string}", function (base, symbol) {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const json = this.response.json;

    expect(this.response.statusCode).to.deep.equal(200);
    expect(json.success).to.be.true;
    expect(json.date).to.deep.equal(currentDate);
    expect(json.base).to.deep.equal(base);
    expect(json.rates).to.have.all.keys(symbol);
});

Then("response should be successful for {string}\\/Every", function (base,) {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const json = this.response.json;

    expect(this.response.statusCode).to.deep.equal(200);
    expect(json.success).to.be.true;
    expect(json.date).to.deep.equal(currentDate);
    expect(json.base).to.deep.equal(base);
    expect(json.rates).to.have.any.keys(SAMPLE_CURRENCY);
});

Then("response should be 401 Unauthorized", function () {
    const json = this.response.json;

    expect(this.response.statusCode).to.deep.equal(401);
    expect(json.rates).to.not.exist;
});

Then("response should be 400 Bad Request", function () {
    const json = this.response.json;

    expect(this.response.statusCode).to.deep.equal(400);
    expect(json.rates).to.not.exist;
});