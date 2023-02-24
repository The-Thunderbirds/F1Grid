import {FormulaOne} from "@/constants";

export const createSet = 
`
import FormulaOne from ${FormulaOne}

// This transaction is for the admin to create a new set resource
// and store it in the Formula One smart contract

// Parameters:
//
// setName: the name of a new Set to be created

transaction(setName: String) {
    
    // Local variable for the FormulaOne Admin object
    let adminRef: &FormulaOne.Admin
    let currSetID: UInt32

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&FormulaOne.Admin>(from: /storage/FormulaOneAdmin)
            ?? panic("Could not borrow a reference to the Admin resource")
        self.currSetID = FormulaOne.nextSetID;
    }

    execute {
        
        // Create a set with the specified name
        self.adminRef.createSet(name: setName)
    }

    post {
        
        FormulaOne.getSetName(setID: self.currSetID) == setName:
          "Could not find the specified set"
    }
}
`