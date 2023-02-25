import FormulaOne from 0xf8d6e0586b0a20c7

// This script returns a boolean indicating if the specified set is locked
// meaning new plays cannot be added to it

// Parameters:
//
// setID: The unique ID for the set whose data needs to be read

// Returns: Bool
// Whether specified set is locked

pub fun main(setID: UInt32): Bool {

    let isLocked = FormulaOne.isSetLocked(setID: setID)
        ?? panic("Could not find the specified set")

    return isLocked
}