import {FormulaOne} from "src/constants";

export const addPlayToSetTX = 
`
import FormulaOne from ${FormulaOne}

// This transaction is how a Formula One admin adds a created play to a set

// Parameters:
//
// setID: the ID of the set to which a created play is added
// playID: the ID of the play being added

transaction(setID: UInt32, playID: UInt32) {

    // Local variable for the FormulaOne Admin object
    let adminRef: &FormulaOne.Admin

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&FormulaOne.Admin>(from: /storage/FormulaOneAdmin)
            ?? panic("Could not borrow a reference to the Admin resource")
    }

    execute {
        
        // Borrow a reference to the set to be added to
        let setRef = self.adminRef.borrowSet(setID: setID)

        // Add the specified play ID
        setRef.addPlay(playID: playID)
    }

    post {

        FormulaOne.getPlaysInSet(setID: setID)!.contains(playID): 
            "set does not contain playID"
    }
}
`