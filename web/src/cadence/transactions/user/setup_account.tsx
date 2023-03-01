import { NonFungibleToken, FormulaOne, MetadataViews, FormulaOneMarket, FormulaOnePacks, FormulaOneMarketPlaceUsers, PuddleV1 } from "src/constants";

export const setupAccount =
`
import NonFungibleToken from ${NonFungibleToken}
import FormulaOne from ${FormulaOne}
import MetadataViews from ${MetadataViews}
import FormulaOneMarket from ${FormulaOneMarket}
import FormulaOnePacks from ${FormulaOnePacks}
import FormulaOneMarketPlaceUsers from ${FormulaOneMarketPlaceUsers}
import PuddleV1 from ${PuddleV1}

transaction {

    prepare(acct: AuthAccount) {

        // First, check to see if a moment collection already exists
        if acct.borrow<&FormulaOne.Collection>(from: /storage/FormulaOneMomentCollection) == nil {

            // create a new FormulaOne Collection
            let collection <- FormulaOne.createEmptyCollection() as! @FormulaOne.Collection

            // Put the new Collection in storage
            acct.save(<-collection, to: /storage/FormulaOneMomentCollection)

            // create a public capability for the collection
            acct.link<&{NonFungibleToken.CollectionPublic, FormulaOne.MomentCollectionPublic, MetadataViews.ResolverCollection}>(/public/FormulaOneMomentCollection, target: /storage/FormulaOneMomentCollection)
        }


        // Creating Sale Collection
        if acct.borrow<&FormulaOneMarket.SaleCollection>(from: /storage/FormulaOneSaleCollection) == nil {

            let ownerCapability = acct.getCapability(/public/flowTokenReceiver)

            let beneficiaryCapability = acct.getCapability(/public/flowTokenReceiver)

            let collection <- FormulaOneMarket.createSaleCollection(ownerCapability: ownerCapability, beneficiaryCapability: beneficiaryCapability, cutPercentage: 0.15)
            
            acct.save(<-collection, to: /storage/FormulaOneSaleCollection)
            
            acct.link<&FormulaOneMarket.SaleCollection{FormulaOneMarket.SalePublic}>(/public/FormulaOneSaleCollection, target: /storage/FormulaOneSaleCollection)
        }

        // Creating Packs Collection
        if acct.borrow<&FormulaOnePacks.PacksCollection>(from: /storage/FormulaOnePacksCollection) == nil {

            let ownerCapability = acct.getCapability(/public/flowTokenReceiver)

            let collection <- FormulaOnePacks.createPacksCollection(ownerCapability: ownerCapability)
            
            acct.save(<-collection, to: /storage/FormulaOnePacksCollection)
            
            acct.link<&FormulaOnePacks.PacksCollection{FormulaOnePacks.PacksPublic}>(/public/FormulaOnePacksCollection, target: /storage/FormulaOnePacksCollection)
        }


        // Creating Packs Collection
        if acct.borrow<&FormulaOnePacks.PackProofCollection>(from: /storage/FormulaOneProofPacksCollection) == nil {

            let ownerCapability = acct.getCapability(/public/flowTokenReceiver)

            let packproofcollection <- FormulaOnePacks.createPackProofCollection()
            
            acct.save(<-packproofcollection, to: /storage/FormulaOneProofPacksCollection)
            
            acct.link<&FormulaOnePacks.PackProofCollection{FormulaOnePacks.PackProofPublic}>(/public/FormulaOneProofPacksCollection, target: /storage/FormulaOneProofPacksCollection)
        }

        // First, check to see if a membership collection already exists
        if acct.borrow<&{PuddleV1.PuddleV1CollectionPublic}>(from: /storage/PuddleV1Collection) == nil {

            // create a new PuddleV1 Collection
            let collection <- PuddleV1.createEmptyCollection() as! @PuddleV1.Collection

            // Put the new Collection in storage
            acct.save(<-collection, to: /storage/PuddleV1Collection)

            // create a public capability for the collection
            acct.link<&{NonFungibleToken.CollectionPublic, PuddleV1.PuddleV1CollectionPublic, MetadataViews.ResolverCollection}>(/public/PuddleV1Collection, target: /storage/PuddleV1Collection)
        }

        FormulaOneMarketPlaceUsers.addUser(addr: acct.address)
    }
}
`