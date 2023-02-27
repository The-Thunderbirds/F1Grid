import FormulaOne from 0xf8d6e0586b0a20c7
import FormulaOneMarket from 0xf8d6e0586b0a20c7

// This transaction is for a user to put a new moment up for sale
// They must have FormulaOne Collection and a FormulaOneMarket Sale Collection
// stored in their account

// Parameters
//
// momentId: the ID of the moment to be listed for sale
// price: the sell price of the moment

transaction(momentID: UInt64, price: UFix64) {

    let collectionRef: &FormulaOne.Collection
    let saleCollectionRef: &FormulaOneMarket.SaleCollection

    prepare(acct: AuthAccount) {

        // borrow a reference to the Formula One Collection
        self.collectionRef = acct.borrow<&FormulaOne.Collection>(from: /storage/FormulaOneMomentCollection)
            ?? panic("Could not borrow from MomentCollection in storage")

        // borrow a reference to the FormulaOne Sale Collection
        self.saleCollectionRef = acct.borrow<&FormulaOneMarket.SaleCollection>(from: /storage/FormulaOneSaleCollection)
            ?? panic("Could not borrow from sale in storage")
    }

    execute {

        // withdraw the specified token from the collection
        let token <- self.collectionRef.withdraw(withdrawID: momentID) as! @FormulaOne.NFT

        // List the specified moment for sale
        self.saleCollectionRef.listForSale(token: <-token, price: price)
    }
}