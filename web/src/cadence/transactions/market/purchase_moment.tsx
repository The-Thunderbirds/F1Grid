import { FungibleToken, DapperUtilityCoin, FormulaOne, FormulaOneMarket } from "src/constants";

export const purchaseMoment = 
`
import FungibleToken from ${FungibleToken}
import DapperUtilityCoin from ${DapperUtilityCoin}
import FormulaOne from ${FormulaOne}
import Market from ${FormulaOneMarket}

// This transaction is for a user to purchase a moment that another user
// has for sale in their sale collection

// Parameters
//
// sellerAddress: the Flow address of the account issuing the sale of a moment
// tokenID: the ID of the moment being purchased
// purchaseAmount: the amount for which the user is paying for the moment; must not be less than the moment's price

transaction(sellerAddress: Address, tokenID: UInt64, purchaseAmount: UInt64) {

    // Local variables for the FormulaOne collection object and token provider
    let collectionRef: &FormulaOne.Collection
    let providerRef: &DapperUtilityCoin.Vault{FungibleToken.Provider}
    
    prepare(acct: AuthAccount) {

        // borrow a reference to the signer's collection
        self.collectionRef = acct.borrow<&FormulaOne.Collection>(from: /storage/MomentCollection)
            ?? panic("Could not borrow reference to the Moment Collection")

        // borrow a reference to the signer's fungible token Vault
        self.providerRef = acct.borrow<&DapperUtilityCoin.Vault{FungibleToken.Provider}>(from: /storage/dapperUtilityCoinVault)!   
    }

    execute {

        // withdraw tokens from the signer's vault
        let tokens <- self.providerRef.withdraw(amount: UFix64(purchaseAmount)) as! @DapperUtilityCoin.Vault

        // get the seller's public account object
        let seller = getAccount(sellerAddress)

        // borrow a public reference to the seller's sale collection
        let FormulaOneSaleCollection = seller.getCapability(/public/FormulaOneSaleCollection)
            .borrow<&{Market.SalePublic}>()
            ?? panic("Could not borrow public sale reference")
    
        // purchase the moment
        let purchasedToken <- FormulaOneSaleCollection.purchase(tokenID: tokenID, buyTokens: <-tokens)

        // deposit the purchased moment into the signer's collection
        self.collectionRef.deposit(token: <-purchasedToken)
    }
}
`