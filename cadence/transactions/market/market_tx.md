## Create Sale Collection

flow transactions send ./cadence/transactions/market/create_sale.cdc f8d6e0586b0a20c7 0.15

## Start Sale

flow transactions send ./cadence/transactions/market/start_sale.cdc 1 10.0

## Purchase Moment

flow transactions send ./cadence/transactions/market/purchase_moment.cdc 0xf8d6e0586b0a20c7 1 10.0 --signer "user"


# Ignore
## Create Dapper Utility Coin Vault for User

flow accounts add-contract ./cadence/contracts/utility/DapperUtilityCoin.cdc --signer "user"