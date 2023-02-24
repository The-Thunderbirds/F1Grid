import FormulaOne from 0xf8d6e0586b0a20c7

// This script gets the setName of a set with specified setID

// Parameters:
//
// setID: The unique ID for the set whose data needs to be read

// Returns: String
// Name of set with specified setID

pub fun main(setID: UInt32): String {

    let name = FormulaOne.getSetName(setID: setID)
        ?? panic("Could not find the specified set")
        
    return name
}