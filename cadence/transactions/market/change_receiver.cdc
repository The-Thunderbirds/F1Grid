import FormulaOneMarket from 0xf8d6e0586b0a20c7

// This transaction changes the path which receives tokens for purchases of an account

// Parameters:
//
// receiverPath: The new fungible token capability for the account who receives tokens for purchases

transaction(receiverPath: PublicPath) {

    // Local variables for the sale collection object and receiver
    let saleCollectionRef: &FormulaOneMarket.SaleCollection
    let receiverPathRef: Capability

    prepare(acct: AuthAccount) {

        self.saleCollectionRef = acct.borrow<&FormulaOneMarket.SaleCollection>(from: /storage/FormulaOneSaleCollection)
            ?? panic("Could not borrow from sale in storage")

        self.receiverPathRef = acct.getCapability(receiverPath)
    }

    execute {

        self.saleCollectionRef.changeOwnerReceiver(self.receiverPathRef)

    }
}