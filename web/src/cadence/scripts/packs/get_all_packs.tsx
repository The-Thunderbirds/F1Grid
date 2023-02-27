import { FormulaOnePacks } from "src/constants";

export const getAllPacks = 
`
import FormulaOnePacks from ${FormulaOnePacks}

// This script returns an array of all the packs 
// that have ever been created for Formula One

// Returns: [FormulaOnePacks.Pack]
// array of all pack created for FormulaOne

pub fun main(): [FormulaOnePacks.Pack] {

    return FormulaOnePacks.getAllPacks()
}
`