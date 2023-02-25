import FormulaOne from 0xf8d6e0586b0a20c7

// This transaction unlocks a FormulaOne NFT removing it from the locked dictionary
// and re-enabling the ability to withdraw, sell, and transfer the moment

// Parameters
//
// id: the Flow ID of the FormulaOne moment
transaction(id: UInt64) {
    prepare(acct: AuthAccount) {
        let collectionRef = acct.borrow<&FormulaOne.Collection>(from: /storage/MomentCollection)
            ?? panic("Could not borrow from MomentCollection in storage")

        collectionRef.unlock(id: id)
    }
}
