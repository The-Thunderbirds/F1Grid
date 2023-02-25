import FormulaOne from 0xf8d6e0586b0a20c7

// This transaction is for retiring a play from a set, which
// makes it so that moments can no longer be minted from that edition

// Parameters:
// 
// setID: the ID of the set in which a play is to be retired
// playID: the ID of the play to be retired

transaction(setID: UInt32, playID: UInt32) {
    
    // local variable for storing the reference to the admin resource
    let adminRef: &FormulaOne.Admin

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&FormulaOne.Admin>(from: /storage/FormulaOneAdmin)
            ?? panic("No admin resource in storage")
    }

    execute {

        // borrow a reference to the specified set
        let setRef = self.adminRef.borrowSet(setID: setID)

        // retire the play
        setRef.retirePlay(playID: playID)
    }

    post {
        
        self.adminRef.borrowSet(setID: setID).getRetired()[playID]!: 
            "play is not retired"
    }
}