import { NonFungibleToken, FormulaOne, MetadataViews } from "src/constants";

export const setupAccount =
`
import NonFungibleToken from ${NonFungibleToken}
import FormulaOne from ${FormulaOne}
import MetadataViews from ${MetadataViews}

// This transaction sets up an account to use Formula One
// by storing an empty moment collection and creating
// a public capability for it

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
    }
}
`