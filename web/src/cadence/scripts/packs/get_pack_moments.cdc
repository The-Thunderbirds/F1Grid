import FormulaOnePacks from 0xf8d6e0586b0a20c7

// This script returns the moments remaining in the pack
// in the FormulaOne smart contract

// Parameters:
//
// packID: The unique ID for the pack whose data needs to be read

// Returns: String
// Value of specified metadata field associated with specified playID

pub fun main(packID: UInt64): [UInt64] {

    let moments = FormulaOnePacks.getPackMoments(packID: packID) ?? panic("Pack doesn't exist")

    return moments
}