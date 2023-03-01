import { NonFungibleToken, FormulaOne, MetadataViews, FormulaOneMarket, FormulaOnePacks, FormulaOneMarketPlaceUsers, PuddleV1 } from "src/constants";

export const createPuddleCollection =
`
import NonFungibleToken from ${NonFungibleToken}
import PuddleV1 from ${PuddleV1}
import MetadataViews from ${MetadataViews}

// This transaction sets up an account to use PuddleV1 
// by storing an empty membership collection and creating
// a public capability for it

transaction {

    prepare(acct: AuthAccount) {

        // First, check to see if a membership collection already exists
        if acct.borrow<&{PuddleV1.PuddleV1CollectionPublic}>(from: /storage/PuddleV1Collection) == nil {

            // create a new PuddleV1 Collection
            let collection <- PuddleV1.createEmptyCollection() as! @PuddleV1.Collection

            // Put the new Collection in storage
            acct.save(<-collection, to: /storage/PuddleV1Collection)

            // create a public capability for the collection
            acct.link<&{NonFungibleToken.CollectionPublic, PuddleV1.PuddleV1CollectionPublic, MetadataViews.ResolverCollection}>(/public/PuddleV1Collection, target: /storage/PuddleV1Collection)
        }
    }
}
`