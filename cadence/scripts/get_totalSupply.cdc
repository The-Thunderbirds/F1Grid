import FormulaOne from 0xf8d6e0586b0a20c7

// This script reads the current number of moments that have been minted
// from the FormulaOne contract and returns that number to the caller

// Returns: UInt64
// Number of moments minted from FormulaOne contract

pub fun main(): UInt64 {

    return FormulaOne.totalSupply
}