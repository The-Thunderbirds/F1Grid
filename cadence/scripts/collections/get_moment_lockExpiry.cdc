import FormulaOne from 0xf8d6e0586b0a20c7
import FormulaOneLocking from 0xFormulaOneLOCKINGADDRESS

// This script gets the time at which a moment will be eligible for unlocking

// Parameters:
//
// account: The Flow Address of the account who owns the moment
// id: The unique ID for the moment

// Returns: UFix64
// The unix timestamp when the moment is unlockable

pub fun main(account: Address, id: UInt64): UFix64 {

    let collectionRef = getAccount(account).getCapability(/public/MomentCollection)
        .borrow<&{FormulaOne.MomentCollectionPublic}>()
        ?? panic("Could not get public moment collection reference")

    let nftRef = collectionRef.borrowNFT(id: id)

    return FormulaOneLocking.getLockExpiry(nftRef: nftRef)
}
