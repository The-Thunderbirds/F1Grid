import FormulaOne from 0xf8d6e0586b0a20c7

// This script returns an array of all the plays
// that have ever been created for Formula One

// Returns: [FormulaOne.Play]
// array of all plays created for FormulaOne

pub fun main(): [FormulaOne.Subedition] {

    return FormulaOne.getAllSubeditions()
}