import FormulaOne from 0xf8d6e0586b0a20c7

// This script returns the full Subedition entity from
// the FormulaOne smart contract

// Parameters:
//
// subeditionID: The unique ID for the subedition whose data needs to be read

// Returns: Subedition
// struct from FormulaOne contract

pub fun main(subeditionID: UInt32): FormulaOne.Subedition {

    let subedititon = FormulaOne.getSubeditionByID(subeditionID: subeditionID)

    return subedititon
}