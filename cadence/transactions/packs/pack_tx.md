## Create Pack Collection

flow transactions send ./cadence/transactions/packs/create_pack_collection.cdc

## Creat new Pack

flow transactions send ./cadence/transactions/packs/create_pack.cdc "[1, 2]" 1 10.0

## Purchase Moment

flow transactions send ./cadence/transactions/packs/purchase_pack.cdc 0xf8d6e0586b0a20c7 1 10.0 --signer user

## Pack Unveil

flow transactions send ./cadence/transactions/packs/pack_unveil.cdc 0xf8d6e0586b0a20c7 1 --signer user

## Gift Pack

flow transactions send ./cadence/transactions/packs/gift_pack.cdc 1 01cf0e2f2f715450