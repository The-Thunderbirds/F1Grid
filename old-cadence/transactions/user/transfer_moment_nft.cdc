import NonFungibleToken from 0xf8d6e0586b0a20c7
import FormulaOne from 0xf8d6e0586b0a20c7

transaction(recipientAddress: Address, withdrawID: UInt64) {
    prepare(signer: AuthAccount) {
        
        let recipient = getAccount(recipientAddress)

        let collectionRef = signer.borrow<&FormulaOne.Collection>(from: FormulaOne.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the owner's collection")
        let depositRef = recipient.getCapability(FormulaOne.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>()!

        let nft <- collectionRef.withdraw(withdrawID: withdrawID)
        depositRef.deposit(token: <-nft)
    }
}