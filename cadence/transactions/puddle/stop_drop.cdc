import FormulaOneMarketPlaceUsers from 0xf8d6e0586b0a20c7
import PuddleV1 from 0xf8d6e0586b0a20c7
import MetadataViews from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7
import FungibleToken from 0xee82856bf20e2aa6

transaction(membershipDropID: UInt64) {

    prepare(acct: AuthAccount) {
        FormulaOneMarketPlaceUsers.closeMembershipDrop(membershipDropID: membershipDropID)
        
        let waitlistUsers = FormulaOneMarketPlaceUsers.getDropWaitlist(id: membershipDropID) ?? panic("No waitlist present for the provided ID")
        let adminMinterRef: &PuddleV1.NFTMinter = acct.borrow<&PuddleV1.NFTMinter>(from: /storage/PuddleV1Minter) ?? panic("Could not borrow a referrence to the PuddleV1Minter resource")

        let drop = FormulaOneMarketPlaceUsers.getDrop(id: membershipDropID) ?? panic("No drop present for the provided ID")
        let drop_name = drop.metadata["name"] ?? panic("No name attribute present in metadata of the drop")
        let drop_desc = drop.metadata["description"] ?? panic("No description attribute present in metadata of the drop")
        let drop_thumbnail = drop.metadata["thumbnail"] ?? panic("No thumbnail attribute present in metadata of the drop")

        let royaltyReceiver =
                        getAccount(0xf8d6e0586b0a20c7).getCapability<&{FungibleToken.Receiver}>(MetadataViews.getRoyaltyReceiverPublicPath())
        let royalties = [
                            MetadataViews.Royalty(
                                receiver: royaltyReceiver,
                                cut: 0.05,
                                description: "PuddleV1 royalty"
                            )
                        ]

        for user in waitlistUsers{
            let receipent = getAccount(user).getCapability(/public/PuddleV1Collection).borrow<&{NonFungibleToken.CollectionPublic}>() ?? panic("Could not borrow a referrence to the PuddleV1Collection resource")
            adminMinterRef.mintNFT(recipient: receipent, name: drop_name, description: drop_desc, thumbnail: drop_thumbnail, royalties: royalties)
        }
    }
}
 