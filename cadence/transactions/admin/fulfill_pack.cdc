import NonFungibleToken from 0xf8d6e0586b0a20c7
import FormulaOne from 0xf8d6e0586b0a20c7
import FormulaOneShardedCollection from 0xSHARDEDADDRESS

// This transaction is what Formula One uses to send the moments in a "pack" to
// a user's collection

// Parameters:
//
// recipientAddr: the Flow address of the account receiving a pack of moments
// momentsIDs: an array of moment IDs to be withdrawn from the owner's moment collection

transaction(recipientAddr: Address, momentIDs: [UInt64]) {

    prepare(acct: AuthAccount) {
        
        // get the recipient's public account object
        let recipient = getAccount(recipientAddr)

        // borrow a reference to the recipient's moment collection
        let receiverRef = recipient.getCapability(/public/MomentCollection)
            .borrow<&{FormulaOne.MomentCollectionPublic}>()
            ?? panic("Could not borrow reference to receiver's collection")

        

        // borrow a reference to the owner's moment collection
        if let collection = acct.borrow<&FormulaOneShardedCollection.ShardedCollection>(from: /storage/ShardedMomentCollection) {
            
            receiverRef.batchDeposit(tokens: <-collection.batchWithdraw(ids: momentIDs))
        } else {

            let collection = acct.borrow<&FormulaOne.Collection>(from: /storage/MomentCollection)! 

            // Deposit the pack of moments to the recipient's collection
            receiverRef.batchDeposit(tokens: <-collection.batchWithdraw(ids: momentIDs))

        }
    }
}