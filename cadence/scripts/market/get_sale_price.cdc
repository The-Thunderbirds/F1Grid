import FormulaOneMarket from 0xf8d6e0586b0a20c7

// This script gets the price of a moment in an account's sale collection
// by looking up its unique ID.

// Parameters:
//
// sellerAddress: The Flow Address of the account whose sale collection needs to be read
// momentID: The unique ID for the moment whose data needs to be read

// Returns: UFix64
// The price of moment with specified ID on sale

pub fun main(sellerAddress: Address, momentID: UInt64): UFix64 {

    let acct = getAccount(sellerAddress)

    let collectionRef = acct.getCapability(/public/FormulaOneSaleCollection).borrow<&{FormulaOneMarket.SalePublic}>()
        ?? panic("Could not borrow capability from public collection")
    
    return collectionRef.getPrice(tokenID: UInt64(momentID))!
}