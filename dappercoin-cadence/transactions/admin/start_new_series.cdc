import FormulaOne from 0xf8d6e0586b0a20c7

// This transaction is for an Admin to start a new Formula One series

transaction {

    // Local variable for the FormulaOne Admin object
    let adminRef: &FormulaOne.Admin
    let currentSeries: UInt32

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        self.adminRef = acct.borrow<&FormulaOne.Admin>(from: /storage/FormulaOneAdmin)
            ?? panic("No admin resource in storage")

        self.currentSeries = FormulaOne.currentSeries
    }

    execute {
        
        // Increment the series number
        self.adminRef.startNewSeries()
    }

    post {
    
        FormulaOne.currentSeries == self.currentSeries + 1 as UInt32:
            "new series not started"
    }
}
 