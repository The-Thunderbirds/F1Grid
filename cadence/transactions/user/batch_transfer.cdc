import NonFungibleToken from 0xf8d6e0586b0a20c7
import FormulaOne from 0xf8d6e0586b0a20c7

// This transaction transfers a number of moments to a recipient

// Parameters
//
// recipientAddress: the Flow address who will receive the NFTs
// momentIDs: an array of moment IDs of NFTs that recipient will receive

transaction(recipientAddress: Address, momentIDs: [UInt64]) {

    let transferTokens: @NonFungibleToken.Collection
    
    prepare(acct: AuthAccount) {

        self.transferTokens <- acct.borrow<&FormulaOne.Collection>(from: /storage/FormulaOneMomentCollection)!.batchWithdraw(ids: momentIDs)
    }

    execute {
        
        // get the recipient's public account object
        let recipient = getAccount(recipientAddress)

        // get the Collection reference for the receiver
        let receiverRef = recipient.getCapability(/public/FormulaOneMomentCollection).borrow<&{FormulaOne.MomentCollectionPublic}>()
            ?? panic("Could not borrow a reference to the recipients moment receiver")

        // deposit the NFT in the receivers collection
        receiverRef.batchDeposit(tokens: <-self.transferTokens)
    }
}