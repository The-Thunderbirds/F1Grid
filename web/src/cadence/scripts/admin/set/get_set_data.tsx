import {FormulaOne} from "src/constants";

export const getSetData = 
`
import FormulaOne from ${FormulaOne}

// This script returns all the metadata about the specified set

// Parameters:
//
// setID: The unique ID for the set whose data needs to be read

// Returns: FormulaOne.QuerySetData

pub fun main(setID: UInt32): FormulaOne.QuerySetData {

    let data = FormulaOne.getSetData(setID: setID)
        ?? panic("Could not get data for the specified set ID")

    return data
}
`