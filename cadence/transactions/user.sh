flow accounts create --network emulator
flow transactions send ./cadence/transactions/tokens/transfer_token.cdc 10000000.0 01cf0e2f2f715450
flow scripts execute ./cadence/scripts/users/get_flow_balance.cdc 01cf0e2f2f715450
flow transactions send ./cadence/transactions/user/setup_account.cdc --signer "user"
flow transactions send ./cadence/transactions/market/purchase_moment.cdc 0xf8d6e0586b0a20c7 1 10.0 --signer "user"
flow scripts execute ./cadence/scripts/collections/get_collection_ids.cdc 01cf0e2f2f715450
flow scripts execute ./cadence/scripts/collections/get_metadata.cdc 01cf0e2f2f715450 1