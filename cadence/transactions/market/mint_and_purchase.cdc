import FungibleToken from 0xee82856bf20e2aa6
import DapperUtilityCoin from 0xf8d6e0586b0a20c7
import FormulaOne from 0xf8d6e0586b0a20c7
import FormulaOneMarket from 0xf8d6e0586b0a20c7

// This transaction mints DapperUtilityCoin (a Fungible Token) to self,
// then purchases a moment for sale from a seller
// then deposits bought moment to a recipient

// Parameters:
//
// sellerAddress: the Flow address of the account issuing the sale of a moment
// recipient: the Flow address who will receive the moment
// tokenID: the ID of the moment being purchased
// purchaseAmount: the amount for which the user is paying for the moment; must not be less than the moment's price

transaction(sellerAddress: Address, recipient: Address, tokenID: UInt64, purchaseAmount: UFix64) {

    // Local variable for the coin admin
    let ducRef: &DapperUtilityCoin.Administrator

    prepare(signer: AuthAccount) {

        self.ducRef = signer
            .borrow<&DapperUtilityCoin.Administrator>(from: /storage/dapperUtilityCoinAdmin) 
            ?? panic("Signer is not the token admin")
    }

    execute {
        
        let minter <- self.ducRef.createNewMinter(allowedAmount: purchaseAmount)

        let mintedVault <- minter.mintTokens(amount: purchaseAmount) as! @DapperUtilityCoin.Vault

        destroy minter

        let seller = getAccount(sellerAddress)
        
        let FormulaOneSaleCollection = seller.getCapability(/public/FormulaOneSaleCollection)
            .borrow<&{FormulaOneMarket.SalePublic}>()
            ?? panic("Could not borrow public sale reference")

        let boughtToken <- FormulaOneSaleCollection.purchase(tokenID: tokenID, buyTokens: <-mintedVault)

        // get the recipient's public account object and borrow a reference to their moment receiver
        let recipient = getAccount(recipient)
            .getCapability(/public/FormulaOneMomentCollection).borrow<&{FormulaOne.MomentCollectionPublic}>()
            ?? panic("Could not borrow a reference to the moment collection")

        // deposit the NFT in the receivers collection
        recipient.deposit(token: <-boughtToken)
    }
}