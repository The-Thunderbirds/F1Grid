cp flow-copy.json flow.json
flow accounts create --network emulator
flow transactions send ./cadence/transactions/tokens/transfer_token.cdc 10000000.0 01cf0e2f2f715450
flow scripts execute ./cadence/scripts/users/get_flow_balance.cdc 01cf0e2f2f715450
flow transactions send ./cadence/transactions/user/setup_all.cdc --signer "user"
flow transactions send ./cadence/transactions/market/purchase_moment.cdc 0xf8d6e0586b0a20c7 1 10.0 --signer "user"
flow scripts execute ./cadence/scripts/collections/get_collection_ids.cdc 01cf0e2f2f715450
flow scripts execute ./cadence/scripts/collections/get_metadata.cdc 01cf0e2f2f715450 1

flow transactions send ./cadence/transactions/packs/purchase_pack.cdc 0xf8d6e0586b0a20c7 1 10.0 --signer "user"

flow transactions send ./cadence/transactions/packs/gift_pack.cdc 1 01cf0e2f2f715450
flow scripts execute ./cadence/scripts/packs/get_pack_proofs.cdc 01cf0e2f2f715450

flow scripts execute ./cadence/scripts/packs/get_all_packs.cdc

flow transactions send ./cadence/transactions/packs/pack_unveil.cdc 0xf8d6e0586b0a20c7 1 --signer "user"
flow scripts execute ./cadence/scripts/collections/get_collection_ids.cdc 01cf0e2f2f715450

flow transactions send ./cadence/transactions/packs/pack_unveil.cdc 0xf8d6e0586b0a20c7 1 --signer "user"
flow scripts execute ./cadence/scripts/packs/get_all_packs.cdc

flow scripts execute ./cadence/scripts/collections/get_collection_ids.cdc 01cf0e2f2f715450
