import NonFungibleToken from 0xf8d6e0586b0a20c7
import FormulaOne from 0xf8d6e0586b0a20c7

transaction(recipientAddress: Address, editionID: UInt64) {
    
    let minter: &{FormulaOne.NFTMinter}
    let recipient: &{FormulaOne.MomentNFTCollectionPublic}

    prepare(signer: AuthAccount) {
        self.minter = signer.getCapability(FormulaOne.MinterPrivatePath)
            .borrow<&{FormulaOne.NFTMinter}>()
            ?? panic("Could not borrow a reference to the NFT minter")

        let recipientAccount = getAccount(recipientAddress)

        self.recipient = recipientAccount.getCapability(FormulaOne.CollectionPublicPath)
            .borrow<&{FormulaOne.MomentNFTCollectionPublic}>()
            ?? panic("Could not borrow a reference to the collection receiver")
    }

    execute {
        let momentNFT <- self.minter.mintNFT(editionID: editionID)
        self.recipient.deposit(token: <- (momentNFT as @NonFungibleToken.NFT))
    }
}
