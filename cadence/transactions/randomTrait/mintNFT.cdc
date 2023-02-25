import ExampleNFT from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7

// This transaction is what an admin would use to mint a single new moment
// and deposit it in a user's collection

// Parameters:
//
// setID: the ID of a set containing the target play
// playID: the ID of a play from which a new moment is minted
// recipientAddr: the Flow address of the account receiving the newly minted moment

transaction(recipientAddr: Address) {
    // local variable for the admin reference
    let minter: &ExampleNFT.NFTMinter

    prepare(acct: AuthAccount) {
        // borrow a reference to the Admin resource in storage
        self.minter = acct.borrow<&ExampleNFT.NFTMinter>(from: /storage/exampleNFTMinter)!
    }

    execute {
        // get the public account object for the recipient
        let recipient = getAccount(recipientAddr)

        // get the Collection reference for the receiver
        let receiverRef = recipient.getCapability(/public/exampleNFTCollection).borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Cannot borrow a reference to the recipient's moment collection")

        self.minter.mintNFT(recipient: receiverRef, name: "NFT", description: "NFT DESC", thumbnail: "thumbnail", royalties: [])
    }
}