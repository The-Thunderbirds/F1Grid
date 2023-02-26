flow project deploy --network emulator
flow transactions send ./cadence/transactions/user/setup_account.cdc
flow transactions send ./cadence/transactions/admin/create_set.cdc "Set 1"
flow transactions send ./cadence/transactions/admin/create_play.cdc '{"name": "Divyam Agrawal", "description": "Best race", "thumbnail": "ipfs://cid"}'
flow transactions send ./cadence/transactions/admin/add_play_to_set.cdc 1 1
flow transactions send ./cadence/transactions/admin/mint_moment.cdc 1 1 f8d6e0586b0a20c7
