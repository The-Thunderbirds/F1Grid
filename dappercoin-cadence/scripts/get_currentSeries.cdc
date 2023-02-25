import FormulaOne from 0xf8d6e0586b0a20c7

// This script reads the current series from the FormulaOne contract and 
// returns that number to the caller

// Returns: UInt32
// currentSeries field in FormulaOne contract

pub fun main(): UInt32 {

    return FormulaOne.currentSeries
}