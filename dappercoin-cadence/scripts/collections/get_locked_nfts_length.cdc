import FormulaOneLocking from 0xFormulaOneLOCKINGADDRESS

// This script determines how many NFTs are locked in the Formula One Locking contract

// Returns: Int
// The number of locked NFTs

pub fun main(): Int {
    return FormulaOneLocking.getLockedNFTsLength()
}
