import FormulaOneMarket from 0xf8d6e0586b0a20c7

// This transaction creates a public sale collection capability that any user can interact with

// Parameters:
//
// beneficiaryAccount: the Flow address of the account where a cut of the purchase will be sent
// cutPercentage: how much in percentage the beneficiary will receive from the sale

transaction(beneficiaryAccount: Address, cutPercentage: UFix64) {

    prepare(acct: AuthAccount) {
        
        let ownerCapability = acct.getCapability(/public/flowTokenReceiver)

        let beneficiaryCapability = getAccount(beneficiaryAccount).getCapability(/public/flowTokenReceiver)

        let collection <- FormulaOneMarket.createSaleCollection(ownerCapability: ownerCapability, beneficiaryCapability: beneficiaryCapability, cutPercentage: cutPercentage)
        
        acct.save(<-collection, to: /storage/FormulaOneSaleCollection)
        
        acct.link<&FormulaOneMarket.SaleCollection{FormulaOneMarket.SalePublic}>(/public/FormulaOneSaleCollection, target: /storage/FormulaOneSaleCollection)
    }
}
