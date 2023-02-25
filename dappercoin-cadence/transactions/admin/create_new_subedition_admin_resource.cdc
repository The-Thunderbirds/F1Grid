import FormulaOne from 0xf8d6e0586b0a20c7

// This transaction is for the admin to create a new subedition admin resource
// and store it in the Formula One smart contract

transaction() {

    // Local variable for the FormulaOne Admin object
    let adminRef: &FormulaOne.Admin

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&FormulaOne.Admin>(from: /storage/FormulaOneAdmin)
            ?? panic("Could not borrow a reference to the Admin resource")
    }

    execute {
        self.adminRef.createSubeditionAdminResource()
    }
}