
# ICEO Recruitment Task - Michał Szymański

## How to run tests

 1. Add your APILayer API KEY in latest_exchange_rates.js file
 2. Type `npm install`
 3. Run `npm test`


## Technologies

 - **Cucumber** - It was required, so I used that one
 - **PactumJS** - I used that one, because it was recommended here - [API Automation - Cucumber Documentation](https://cucumber.io/docs/guides/api-automation/?lang=javascript)
 - **Chai** - It was just my personal preference

## Reporting

Report is available [here](https://reports.cucumber.io/reports/44656343-d9c1-4115-b57a-03007664ccd6)


## Covered cases

 - Sending request without API key
 - Sending request with incorrect base currency
 - Sending request with incorrect symbol currency
 - Sending request without parameters
 - Converting one currency without specifying desired one
 - Converting one currency into another

## Comments

 - I didn't see any ways to achieve 403 and 404 errors on that specific endpoint, so I didn't covered it
 - In final project I would use environment variables (dot.env) instead of using const APILAYER_API_KEY, but I've decided to keep it like that to simplify stuff
