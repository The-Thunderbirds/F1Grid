import FormulaOneMarket from 0xf8d6e0586b0a20c7

// This script gets the number of moments an account has for sale

// Parameters:
//
// sellerAddress: The Flow Address of the account whose sale collection needs to be read

// Returns: Int
// Number of moments up for sale in an account

pub fun main(sellerAddress: Address): Int {

    let acct = getAccount(sellerAddress)

    let collectionRef = acct.getCapability(/public/FormulaOneSaleCollection)
        .borrow<&{FormulaOneMarket.SalePublic}>()
        ?? panic("Could not borrow capability from public collection")
    
    return collectionRef.getIDs().length
}