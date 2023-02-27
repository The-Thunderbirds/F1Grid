import { FormulaOne, FormulaOnePacks } from "src/constants";

export const packUnveil = 
`
import FormulaOne from ${FormulaOne}
import FormulaOnePacks from ${FormulaOnePacks}

transaction(sellerAddress: Address, packID: UInt64) {

    // Local variables for the FormulaOne collection object and token provider
    let collectionRef: &FormulaOne.Collection
    let packProofRef: &FormulaOnePacks.PackProofCollection

    prepare(acct: AuthAccount) {

        // borrow a reference to the signer's collection
        self.collectionRef = acct.borrow<&FormulaOne.Collection>(from: /storage/FormulaOneMomentCollection)
            ?? panic("Could not borrow reference to the Moment Collection")

        // borrow a reference to the signer's pack proof collection
        self.packProofRef = acct.borrow<&FormulaOnePacks.PackProofCollection>(from: /storage/FormulaOneProofPacksCollection)
            ?? panic("Could not borrow reference to the Pack Proof Collection")

    }

    execute {

        let packProofIds = self.packProofRef.getIDs()

        var ppExists: Bool = false
        for id in packProofIds {
            var packProof = self.packProofRef.borrowPackProof(id: id)

            if(packProof.packID == packID) {
                let reqd <- self.packProofRef.withdraw(withdrawID: packProof.id)

                let seller = getAccount(sellerAddress)

                // borrow a public reference to the seller's sale collection
                let FormulaOnePacksCollection = seller.getCapability(/public/FormulaOnePacksCollection)
                    .borrow<&{FormulaOnePacks.PacksPublic}>()
                    ?? panic("Could not borrow public sale reference")

                let nfts <- FormulaOnePacksCollection.unveilPack(packID: packID, packProof: <-reqd) 

                var i = nfts.length - 1
                while i >= 0 {
                    self.collectionRef.deposit(token: <- nfts.remove(at: 0))
                    i = i - 1
                }

                ppExists = true
                break
            }
        }

        if(!ppExists) {
            panic("No Pack Proof for the given id exists")
        }
    }
}
`