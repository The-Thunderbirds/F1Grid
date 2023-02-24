import {FormulaOne} from "src/constants";

export const getNextPlayID = 
`
import FormulaOne from ${FormulaOne}

// This script reads the public nextPlayID from the FormulaOne contract and 
// returns that number to the caller

// Returns: UInt32
// the nextPlayID field in FormulaOne contract

pub fun main(): UInt32 {

    log(FormulaOne.nextPlayID)

    return FormulaOne.nextPlayID
}
`