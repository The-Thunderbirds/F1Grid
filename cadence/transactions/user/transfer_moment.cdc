import NonFungibleToken from 0xf8d6e0586b0a20c7
import FormulaOne from 0xf8d6e0586b0a20c7

// This transaction transfers a moment to a recipient

// This transaction is how a FormulaOne user would transfer a moment
// from their account to another account
// The recipient must have a FormulaOne Collection object stored
// and a public MomentCollectionPublic capability stored at
// `/public/FormulaOneMomentCollection`

// Parameters:
//
// recipient: The Flow address of the account to receive the moment.
// withdrawID: The id of the moment to be transferred

transaction(recipient: Address, withdrawID: UInt64) {

    // local variable for storing the transferred token
    let transferToken: @NonFungibleToken.NFT
    
    prepare(acct: AuthAccount) {

        // borrow a reference to the owner's collection
        let collectionRef = acct.borrow<&FormulaOne.Collection>(from: /storage/FormulaOneMomentCollection)
            ?? panic("Could not borrow a reference to the stored Moment collection")
        
        // withdraw the NFT
        self.transferToken <- collectionRef.withdraw(withdrawID: withdrawID)
    }

    execute {
        
        // get the recipient's public account object
        let recipient = getAccount(recipient)

        // get the Collection reference for the receiver
        let receiverRef = recipient.getCapability(/public/FormulaOneMomentCollection).borrow<&{FormulaOne.MomentCollectionPublic}>()!

        // deposit the NFT in the receivers collection
        receiverRef.deposit(token: <-self.transferToken)
    }
}