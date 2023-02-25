import FormulaOne from 0xf8d6e0586b0a20c7

// This transaction creates a new subedition struct
// and stores it in the Formula One smart contract

// Parameters:
//
// name:  the name of a new Subedition to be created
// metadata: A dictionary of all the play metadata associated

transaction(name:String, metadata:{String:String}) {

    // Local variable for the FormulaOne Admin object
    let adminRef: &FormulaOne.Admin
    let currSubeditionID: UInt32

    prepare(acct: AuthAccount) {

        // borrow a reference to the admin resource
        self.currSubeditionID = FormulaOne.getNextSubeditionID();
        self.adminRef = acct.borrow<&FormulaOne.Admin>(from: /storage/FormulaOneAdmin)
            ?? panic("No admin resource in storage")
    }

    execute {

        // Create a subedition with the specified metadata
        self.adminRef.createSubedition(name: name, metadata: metadata)
    }

    post {

        FormulaOne.getSubeditionByID(subeditionID: self.currSubeditionID) != nil:
            "SubedititonID doesnt exist"
    }
}