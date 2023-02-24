import FormulaOne from 0xf8d6e0586b0a20c7

// This script returns the value for the specified metadata field
// associated with a play in the FormulaOne smart contract

// Parameters:
//
// playID: The unique ID for the play whose data needs to be read
// field: The specified metadata field whose data needs to be read

// Returns: String
// Value of specified metadata field associated with specified playID

pub fun main(playID: UInt32, field: String): String {

    let field = FormulaOne.getPlayMetaDataByField(playID: playID, field: field) ?? panic("Play doesn't exist")

    log(field)

    return field
}