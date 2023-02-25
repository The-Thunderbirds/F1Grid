import {FormulaOne} from "@/constants";

export const createPlay = 
`
import FormulaOne from ${FormulaOne}

// This transaction creates a new play struct 
// and stores it in the Formula One smart contract
// We currently stringify the metadata and insert it into the 
// transaction string, but want to use transaction arguments soon

// Parameters:
//
// metadata: A dictionary of all the play metadata associated

transaction(metadata: {String: String}) {

    // Local variable for the FormulaOne Admin object
    let adminRef: &FormulaOne.Admin
    let currPlayID: UInt32

    prepare(acct: AuthAccount) {

        // borrow a reference to the admin resource
        self.currPlayID = FormulaOne.nextPlayID;
        self.adminRef = acct.borrow<&FormulaOne.Admin>(from: /storage/FormulaOneAdmin)
            ?? panic("No admin resource in storage")
    }

    execute {

        // Create a play with the specified metadata
        self.adminRef.createPlay(metadata: metadata)
    }

    post {
        
        FormulaOne.getPlayMetaData(playID: self.currPlayID) != nil:
            "playID doesnt exist"
    }
}
`