
import { FormulaOneMarket, FungibleToken } from "src/constants";

export const createSaleCollection = 
`
import FormulaOneMarket from ${FormulaOneMarket}

// This transaction creates a public sale collection capability that any user can interact with

// Parameters:
//
// tokenReceiverPath: token capability for the account who will receive tokens for purchase
// beneficiaryAccount: the Flow address of the account where a cut of the purchase will be sent
// cutPercentage: how much in percentage the beneficiary will receive from the sale

transaction(tokenReceiverPath: PublicPath, beneficiaryAccount: Address, cutPercentage: UFix64) {

    prepare(acct: AuthAccount) {

        let collection <- FormulaOneMarket.createSaleCollection(ownerAddress: beneficiaryAccount, tokenReceiverPath: /public/flowTokenReceiver, beneficiaryAccount: beneficiaryAccount, cutPercentage: cutPercentage)
        
        acct.save(<-collection, to: /storage/FormulaOneSaleCollection)
        
        acct.link<&FormulaOneMarket.SaleCollection{FormulaOneMarket.SalePublic}>(/public/FormulaOneSaleCollection, target: /storage/FormulaOneSaleCollection)
    }
}
`