import FormulaOne from 0xf8d6e0586b0a20c7

// This script gets the set name associated with a moment
// in a collection by getting a reference to the moment
// and then looking up its name

// Parameters:
//
// account: The Flow Address of the account whose moment data needs to be read
// id: The unique ID for the moment whose data needs to be read

// Returns: String
// The set name associated with a moment with a specified ID

pub fun main(account: Address, id: UInt64): String {

    // borrow a public reference to the owner's moment collection 
    let collectionRef = getAccount(account).getCapability(/public/FormulaOneMomentCollection)
        .borrow<&{FormulaOne.MomentCollectionPublic}>()
        ?? panic("Could not get public moment collection reference")

    // borrow a reference to the specified moment in the collection
    let token = collectionRef.borrowMoment(id: id)
        ?? panic("Could not borrow a reference to the specified moment")

    let data = token.data

    return FormulaOne.getSetName(setID: data.setID)!
}