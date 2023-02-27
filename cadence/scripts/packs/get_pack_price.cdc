import FormulaOnePacks from 0xf8d6e0586b0a20c7

// This script gets the price of a pack in an account's pack collection
// by looking up its unique ID.

// Parameters:
//
// sellerAddress: The Flow Address of the account whose pack collection needs to be read
// packID: The unique ID for the pack whose data needs to be read

// Returns: UFix64
// The price of pack with specified ID on sale

pub fun main(sellerAddress: Address, packID: UInt64): UFix64 {

    let acct = getAccount(sellerAddress)

    let collectionRef = acct.getCapability(/public/FormulaOnePacksCollection).borrow<&{FormulaOnePacks.PacksPublic}>()
        ?? panic("Could not borrow capability from public collection")
    
    return collectionRef.getPrice(packID: UInt64(packID))!
}