import { FormulaOne, FormulaOnePacks } from "src/constants";

export const createPack = 
`
import FormulaOne from ${FormulaOne}
import FormulaOnePacks from ${FormulaOnePacks}

import FormulaOne from 0xf8d6e0586b0a20c7
import FormulaOnePacks from 0xf8d6e0586b0a20c7

// This transaction is for a user to put a new pack up for sale
// They must have FormulaOne Collection and a FormulaOnePacks Collection
// stored in their account

// Parameters
//
// momentIDs: the IDs of the moments to be listed for sale in a pack
// price: the sell price of the pack

transaction(momentIDs: [UInt64], momentsPerPack: UInt64, price: UFix64, owner: Address) {

    let collectionRef: &FormulaOne.Collection
    let packsCollectionRef: &FormulaOnePacks.PacksCollection

    prepare(acct: AuthAccount) {

        // borrow a reference to the Formula One Collection
        self.collectionRef = acct.borrow<&FormulaOne.Collection>(from: /storage/FormulaOneMomentCollection)
            ?? panic("Could not borrow from MomentCollection in storage")

        // borrow a reference to the FormulaOne Sale Collection
        self.packsCollectionRef = acct.borrow<&FormulaOnePacks.PacksCollection>(from: /storage/FormulaOnePacksCollection)
            ?? panic("Could not borrow from PacksCollection in storage")
    }

    execute {

        let tokens <- self.collectionRef.batchWithdraw(ids: momentIDs) as! @FormulaOne.Collection
        let packID = self.packsCollectionRef.createPack(tokens: <-tokens, momentsPerPack: momentsPerPack, price: price, owner: owner)

        // let packID = self.packsCollectionRef.createNewPack(momentsPerPack: momentsPerPack, price: price)

        // for momentID in momentIDs {
        //     // withdraw the specified token from the collection
        //     let token <- self.collectionRef.withdraw(withdrawID: momentID) as! @FormulaOne.NFT

        //     // List the specified moment for sale
        //     self.packsCollectionRef.addTokenInPack(packID: packID, token: <-token)
        // }
    }
}
`