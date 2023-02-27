import FormulaOnePacks from 0xf8d6e0586b0a20c7

// This script returns an array of all the packs 
// that have ever been created for Formula One

// Returns: [FormulaOnePacks.Pack]
// array of all pack created for FormulaOne

pub fun main(): [FormulaOnePacks.Pack] {

    return FormulaOnePacks.getAllPacks()
}