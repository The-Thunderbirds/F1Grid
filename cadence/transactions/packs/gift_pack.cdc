import FormulaOne from 0xf8d6e0586b0a20c7
import FormulaOnePacks from 0xf8d6e0586b0a20c7

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