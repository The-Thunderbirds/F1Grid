import FormulaOnePacks from 0xf8d6e0586b0a20c7

// This transaction creates a public packs collection capability that any user can interact with
transaction() {

    prepare(acct: AuthAccount) {
        
        let ownerCapability = acct.getCapability(/public/flowTokenReceiver)

        let collection <- FormulaOnePacks.createPacksCollection(ownerCapability: ownerCapability)
        
        acct.save(<-collection, to: /storage/FormulaOnePacksCollection)
        
        acct.link<&FormulaOnePacks.PacksCollection{FormulaOnePacks.PacksPublic}>(/public/FormulaOnePacksCollection, target: /storage/FormulaOnePacksCollection)

        let packproofcollection <- FormulaOnePacks.createPackProofCollection()
        
        acct.save(<-packproofcollection, to: /storage/FormulaOneProofPacksCollection)
        
        acct.link<&FormulaOnePacks.PackProofCollection{FormulaOnePacks.PackProofPublic}>(/public/FormulaOneProofPacksCollection, target: /storage/FormulaOneProofPacksCollection)

    }
}
