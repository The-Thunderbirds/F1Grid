import FormulaOne from 0xf8d6e0586b0a20c7
import FormulaOneLocking from 0xFormulaOneLOCKINGADDRESS

// This script determines if a moment is locked

// Parameters:
//
// account: The Flow Address of the account who owns the moment
// id: The unique ID for the moment

// Returns: Bool
// Whether the moment is locked

pub fun main(account: Address, id: UInt64): Bool {

    let collectionRef = getAccount(account).getCapability(/public/FormulaOneMomentCollection)
        .borrow<&{FormulaOne.MomentCollectionPublic}>()
        ?? panic("Could not get public moment collection reference")

    let nftRef = collectionRef.borrowNFT(id: id)

    return FormulaOneLocking.isLocked(nftRef: nftRef)
}
