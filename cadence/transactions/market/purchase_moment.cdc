import FungibleToken from 0xee82856bf20e2aa6
import FlowToken from 0x0ae53cb6e3f42a79
import FormulaOne from 0xf8d6e0586b0a20c7
import FormulaOneMarket from 0xf8d6e0586b0a20c7


// This transaction is for a user to purchase a moment that another user
// has for sale in their sale collection

// Parameters
//
// sellerAddress: the Flow address of the account issuing the sale of a moment
// tokenID: the ID of the moment being purchased
// purchaseAmount: the amount for which the user is paying for the moment; must not be less than the moment's price

transaction(sellerAddress: Address, tokenID: UInt64, purchaseAmount: UFix64) {

    // Local variables for the FormulaOne collection object and token provider
    let collectionRef: &FormulaOne.Collection
    let providerRef: &FlowToken.Vault{FungibleToken.Provider}
    
    prepare(acct: AuthAccount) {

        // borrow a reference to the signer's collection
        self.collectionRef = acct.borrow<&FormulaOne.Collection>(from: /storage/MomentCollection)
            ?? panic("Could not borrow reference to the Moment Collection")

        // borrow a reference to the signer's fungible token Vault
        self.providerRef = acct.borrow<&FlowToken.Vault{FungibleToken.Provider}>(from: /storage/flowTokenVault)!   
    }

    execute {

        // withdraw tokens from the signer's vault
        let tokens <- self.providerRef.withdraw(amount: purchaseAmount) as! @FlowToken.Vault

        // get the seller's public account object
        let seller = getAccount(sellerAddress)

        // borrow a public reference to the seller's sale collection
        let FormulaOneSaleCollection = seller.getCapability(/public/FormulaOneSaleCollection)
            .borrow<&{FormulaOneMarket.SalePublic}>()
            ?? panic("Could not borrow public sale reference")
    
        // purchase the moment
        let purchasedToken <- FormulaOneSaleCollection.purchase(tokenID: tokenID, buyTokens: <-tokens)

        // deposit the purchased moment into the signer's collection
        self.collectionRef.deposit(token: <-purchasedToken)
    }
}