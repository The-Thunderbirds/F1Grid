import FungibleToken from 0xee82856bf20e2aa6
import FlowToken from 0x0ae53cb6e3f42a79
import FormulaOne from 0xf8d6e0586b0a20c7
import FormulaOnePacks from 0xf8d6e0586b0a20c7


// This transaction is for a user to purchase a pack that another user
// has for sale in their pack collection

// Parameters
//
// sellerAddress: the Flow address of the account issuing the sale of a moment
// packID: the ID of the pack being purchased
// purchaseAmount: the amount for which the user is paying for the pack

transaction(sellerAddress: Address, packID: UInt64, purchaseAmount: UFix64) {

    // Local variables for the FormulaOne collection object and token provider
    let packProofRef: &FormulaOnePacks.PackProofCollection
    let providerRef: &FlowToken.Vault{FungibleToken.Provider}
    
    prepare(acct: AuthAccount) {

        // borrow a reference to the signer's pack proof collection
        self.packProofRef = acct.borrow<&FormulaOnePacks.PackProofCollection>(from: /storage/FormulaOneProofPacksCollection)
            ?? panic("Could not borrow reference to the Pack Proof Collection")

        // borrow a reference to the signer's fungible token Vault
        self.providerRef = acct.borrow<&FlowToken.Vault{FungibleToken.Provider}>(from: /storage/flowTokenVault)!   
    }

    execute {

        // withdraw tokens from the signer's vault
        let tokens <- self.providerRef.withdraw(amount: purchaseAmount) as! @FlowToken.Vault

        // get the seller's public account object
        let seller = getAccount(sellerAddress)

        // borrow a public reference to the seller's sale collection
        let FormulaOnePacksCollection = seller.getCapability(/public/FormulaOnePacksCollection)
            .borrow<&{FormulaOnePacks.PacksPublic}>()
            ?? panic("Could not borrow public sale reference")
    
        // purchase the moment
        let packProof <- FormulaOnePacksCollection.purchase(packID: packID, buyTokens: <-tokens)

        self.packProofRef.deposit(token: <-packProof)
    }
}