# Tables

## Persistent tables

### Common fields

Every table has the following fields

| Field       | Type          | Example             |
| ----------- | ------------- | ------------------- |
| id          | bigint        | 1                   |
| inserted_at | utc timestamp | 2023-10-31 10:52:19 |
| updated_at  | utc timestamp | 2023-10-31 10:52:19 |

### User

Represents an application user.

| Field               | Type                                        | Example                          |
| ------------------- | ------------------------------------------- | -------------------------------- |
| firstname           | str                                         | haleig                           |
| lastname            | str                                         | schumm                           |
| nickname            | str                                         | haleigh.schumm                   |
| email               | str                                         | haleigh.schumm@adell.biz         |
| password_hash       | str                                         | //                               |
| default_currency    | [Currency](#currency) (Has one)             | //                               |
| followed_currencies | Array of [currencies](#currency) (Has many) | //                               |
| press_keywords      | Array of string (json format)               | ['bitcoin', 'ethereum', 'crash'] |

### Currency

Represent an existing currency. The currency may be a crypto one (bitcoin/ethereum) or a real one (euro/dollar).

| Field     | Type | Example |
| --------- | ---- | ------- |
| name      | str  | Euro    |
| symbol    | str  | €       |
| api_id    | str  | eur     |
| is_crypto | bool | false   |
| image_url | str  | //      |

## Temporary tables (api caching)

### Exchange

Crypto-to-real currencies associations.

| Field             | Type                       | Description              | Example  |
| ----------------- | -------------------------- | ------------------------ | -------- |
| crypto_currency   | [Currency](#currency)      | Crypto currency          | #Bitcoin |
| exchange_currency | [Currency](#currency)      | Exchanged currency       | #Euro    |
| _prices_          | Array of [Price](#price)   | Exchange price history   | //       |
| _candles_         | Array of [Candle](#candle) | Exchange candles history | //       |

### Price

Cached crypto-to-real price at given times.

| Field         | Type                  | Description                     | Example                        |
| ------------- | --------------------- | ------------------------------- | ------------------------------ |
| exchange      | [Exchange](#exchange) | Currencies                      | Bitcoin -> Euro                |
| time          | utc timestamp         | Date of this data               | 2023-10-31 10:52:00            |
| current_price | float                 | Price in the exchanged currency | 34503 (1Bitcoin -> 34503Euros) |

### Candle

Cached candle OHLC (Open, High, Low, Close) of a given time period.

| Field           | Type                           | Description                       | Example             |
| --------------- | ------------------------------ | --------------------------------- | ------------------- |
| exchange        | [Exchange](#exchange-currency) | Currencies                        | Bitcoin -> Euro     |
| time            | utc timestamp                  | Date of this data                 | 2023-10-31 10:52:00 |
| period_duration | int                            | Duration of the period in seconds | 14400 (4hours)      |
| open            | float                          | Opening price                     | 34532.27            |
| high            | float                          | Highest price                     | 34533.89            |
| low             | float                          | Lowest price                      | 34352.92            |
| close           | float                          | Closing price                     | 34459.78            |
