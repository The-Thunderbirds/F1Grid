import FormulaOne from 0xf8d6e0586b0a20c7
import FormulaOneMarket from 0xf8d6e0586b0a20c7

// This script gets the setID of a moment in an account's sale collection
// by looking up its unique ID

// Parameters:
//
// sellerAddress: The Flow Address of the account whose sale collection needs to be read
// momentID: The unique ID for the moment whose data needs to be read

// Returns: UInt32
// The setID of moment with specified ID

pub fun main(sellerAddress: Address, momentID: UInt64): {String: String} {

    let saleRef = getAccount(sellerAddress).getCapability(/public/FormulaOneSaleCollection)
        .borrow<&{FormulaOneMarket.SalePublic}>()
        ?? panic("Could not get public sale reference")

    let token = saleRef.borrowMoment(id: momentID)
        ?? panic("Could not borrow a reference to the specified moment")

    let data = token.data

    // Use the moment's play ID 
    // to get all the metadata associated with that play
    let metadata = FormulaOne.getPlayMetaData(playID: data.playID) ?? panic("Play doesn't exist")

    return metadata
}