## Create a new Set

flow transactions send ./cadence/transactions/admin/create_set.cdc "Set 1"

## Create a new Play

flow transactions send ./cadence/transactions/admin/create_play.cdc '{"playerFirstName": "Divyam", "playerLastName": "Agrawal", "playType": "Gold", "description": "Best race", "metadata": "ipfs://cid"}'

## Add Play to Set

flow transactions send ./cadence/transactions/admin/add_play_to_set.cdc 1 1

## Mint Moment

flow transactions send ./cadence/transactions/admin/mint_moment.cdc 1 1 f8d6e0586b0a20c7

