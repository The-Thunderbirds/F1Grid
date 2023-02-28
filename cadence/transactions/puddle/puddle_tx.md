flow transactions send ./cadence/transactions/puddle/create_collection.cdc --signer "emulator-account"

flow transactions send ./cadence/transactions/puddle/start_drop.cdc "Gold" 5346363 10 '{"name": "Gold Membership", "description": "With this, you get access to premium drops before hand. Get a Diamond membership to also get notified via an email/mobile", "thumbnail": "ipfs://thumbnail"}'

flow transactions send ./cadence/transactions/puddle/add_user_to_waitlist.cdc 0 "e03daebed8ca0615" --signer "user1"

flow transactions send ./cadence/transactions/puddle/stop_drop.cdc 0 --signer "emulator-account"