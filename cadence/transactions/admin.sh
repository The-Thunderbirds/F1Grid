flow project deploy --network emulator
flow transactions send ./cadence/transactions/user/setup_all.cdc
flow transactions send ./cadence/transactions/admin/create_set.cdc "Set 1"
flow transactions send ./cadence/transactions/admin/create_play.cdc '{"name": "Divyam Agrawal", "description": "Best race", "thumbnail": "ipfs://cid"}'
flow transactions send ./cadence/transactions/admin/add_play_to_set.cdc 1 1

flow transactions send ./cadence/transactions/admin/mint_moment.cdc 1 1 f8d6e0586b0a20c7
flow transactions send ./cadence/transactions/admin/mint_moment.cdc 1 1 f8d6e0586b0a20c7
flow transactions send ./cadence/transactions/admin/mint_moment.cdc 1 1 f8d6e0586b0a20c7
flow transactions send ./cadence/transactions/admin/mint_moment.cdc 1 1 f8d6e0586b0a20c7
flow transactions send ./cadence/transactions/admin/mint_moment.cdc 1 1 f8d6e0586b0a20c7
flow transactions send ./cadence/transactions/admin/mint_moment.cdc 1 1 f8d6e0586b0a20c7

flow transactions send ./cadence/transactions/market/start_sale.cdc 1 10.0

flow transactions send ./cadence/transactions/packs/create_pack.cdc "[3, 4, 5, 6]" 2 10.0 0xf8d6e0586b0a20c7
flow scripts execute ./cadence/scripts/packs/get_all_packs.cdc
