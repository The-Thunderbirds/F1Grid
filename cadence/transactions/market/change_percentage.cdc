import FormulaOneMarket from 0xf8d6e0586b0a20c7

// This transaction changes the percentage cut of a moment's sale given to beneficiary

// Parameters:
//
// newPercentage: new percentage of tokens the beneficiary will receive from the sale

transaction(newPercentage: UFix64) {

    // Local variable for the account's FormulaOne sale collection
    let FormulaOneSaleCollectionRef: &FormulaOneMarket.SaleCollection

    prepare(acct: AuthAccount) {

        // borrow a reference to the owner's sale collection
        self.FormulaOneSaleCollectionRef = acct.borrow<&FormulaOneMarket.SaleCollection>(from: /storage/FormulaOneSaleCollection)
            ?? panic("Could not borrow from sale in storage")
    }

    execute {

        // Change the percentage of the moment
        self.FormulaOneSaleCollectionRef.changePercentage(newPercentage)
    }

    post {

        self.FormulaOneSaleCollectionRef.cutPercentage! == newPercentage: 
            "cutPercentage not changed"
    }
    
}