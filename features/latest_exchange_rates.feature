Feature: Getting latest exchange rates

    Scenario: User send request without API key
        Given user fetch latest endpoint
        When request is sent without API key
        Then response should be 401 Unauthorized

    Scenario: User send request with incorrect base currency
        Given user fetch latest endpoint
        When request is sent for "XXX" base
        Then response should be 400 Bad Request

    Scenario: User send request with incorrect symbol currency
        Given user fetch latest endpoint
        When request is sent for "EUR" base and "XXX" symbol
        Then response should be 400 Bad Request

    Scenario: User send correct request without params
        Given user fetch latest endpoint
        When request is sent without params
        Then response should be successful for "EUR"/Every
    
    Scenario: User wants to convert PLN currency
        Given user fetch latest endpoint
        When request is sent for "PLN" base
        Then response should be successful for "PLN"/Every

    Scenario: User wants to convert PLN currency into USD
        Given user fetch latest endpoint
        When request is sent for "PLN" base and "USD" symbol
        Then response should be successful for "PLN"/"USD"
