import FormulaOne from 0xf8d6e0586b0a20c7

// This transaction locks a set so that new plays can no longer be added to it

// Parameters:
//
// setID: the ID of the set to be locked

transaction(setID: UInt32) {

    // local variable for the admin resource
    let adminRef: &FormulaOne.Admin

    prepare(acct: AuthAccount) {
        // borrow a reference to the admin resource
        self.adminRef = acct.borrow<&FormulaOne.Admin>(from: /storage/FormulaOneAdmin)
            ?? panic("No admin resource in storage")
    }

    execute {
        // borrow a reference to the Set
        let setRef = self.adminRef.borrowSet(setID: setID)

        // lock the set permanently
        setRef.lock()
    }

    post {
        
        FormulaOne.isSetLocked(setID: setID)!:
            "Set did not lock"
    }
}