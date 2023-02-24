import FormulaOne from 0xf8d6e0586b0a20c7
import FormulaOneAdminReceiver from 0x01cf0e2f2f715450

// this transaction takes a FormulaOne Admin resource and 
// saves it to the account storage of the account
// where the contract is deployed

transaction {

    // Local variable for the FormulaOne Admin object
    let adminRef: @FormulaOne.Admin

    prepare(acct: AuthAccount) {

        self.adminRef <- acct.load<@FormulaOne.Admin>(from: /storage/FormulaOneAdmin)
            ?? panic("No FormulaOne admin in storage")
    }

    execute {

        FormulaOneAdminReceiver.storeAdmin(newAdmin: <-self.adminRef)
        
    }
}