import NonFungibleToken from 0xf8d6e0586b0a20c7
import FormulaOne from 0xf8d6e0586b0a20c7

transaction(recipientAddress: Address, editionIDs: [UInt64], counts: [UInt64]) {
    
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

    pre {
        editionIDs.length == counts.length: "must pass arrays of same length"
    }

    execute {
        var i = 0
        while i < editionIDs.length {
            var remaining = counts[i]
            while remaining > 0 {
                self.recipient.deposit(token: <- self.minter.mintNFT(editionID: editionIDs[i]))
                remaining = remaining - 1
            }
            i = i + 1
        }
    }
}