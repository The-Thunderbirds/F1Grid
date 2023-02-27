import { FormulaOnePacks } from "src/constants";

export const giftPack = 
`
import FormulaOnePacks from ${FormulaOnePacks}

transaction(packID: UInt64, recipientAddr: Address) {
    let packsCollectionRef: &FormulaOnePacks.PacksCollection

    prepare(acct: AuthAccount) {
        self.packsCollectionRef = acct.borrow<&FormulaOnePacks.PacksCollection>(from: /storage/FormulaOnePacksCollection)!
    }

    execute {
        let packProofRef <- self.packsCollectionRef.gift(packID: packID)

        let recipient = getAccount(recipientAddr)

        let receiverRef = recipient.getCapability(/public/FormulaOneProofPacksCollection).borrow<&{FormulaOnePacks.PackProofPublic}>()
            ?? panic("Cannot borrow a reference to the recipient's FormulaOne Proof pack collection")

        receiverRef.deposit(token: <-packProofRef)
    }
}
`