import FormulaOne from 0xf8d6e0586b0a20c7

// This transaction links nft to subedititon

// Parameters:
//
// nftID:  the unique ID of nft
// subeditionID: the unique ID of subedition

transaction(nftID: UInt64, subeditionID: UInt32, setID: UInt32, playID: UInt32) {

    // Local variable for the FormulaOne Admin object
    let adminRef: &FormulaOne.Admin

    prepare(acct: AuthAccount) {
        // borrow a reference to the admin resource
        self.adminRef = acct.borrow<&FormulaOne.Admin>(from: /storage/FormulaOneAdmin)
            ?? panic("No admin resource in storage")
    }

    execute {
        // Create a subedition with the specified metadata
        self.adminRef.setMomentsSubedition(nftID: nftID, subeditionID: subeditionID, setID: setID, playID: playID)
    }
}