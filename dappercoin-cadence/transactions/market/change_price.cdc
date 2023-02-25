import FormulaOne from 0xf8d6e0586b0a20c7
import Market from 0xf8d6e0586b0a20c7

// This transaction changes the price of a moment that a user has for sale

// Parameters:
//
// tokenID: the ID of the moment whose price is being changed
// newPrice: the new price of the moment

transaction(tokenID: UInt64, newPrice: UFix64) {

    // Local variable for the account's FormulaOne sale collection
    let FormulaOneSaleCollectionRef: &Market.SaleCollection

    prepare(acct: AuthAccount) {

        // borrow a reference to the owner's sale collection
        self.FormulaOneSaleCollectionRef = acct.borrow<&Market.SaleCollection>(from: /storage/FormulaOneSaleCollection)
            ?? panic("Could not borrow from sale in storage")
    }

    execute {

        // Change the price of the moment
        self.FormulaOneSaleCollectionRef.changePrice(tokenID: tokenID, newPrice: newPrice)
    }

    
}