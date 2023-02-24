import NonFungibleToken from 0xf8d6e0586b0a20c7
import FormulaOne from 0xf8d6e0586b0a20c7

transaction {
    prepare(signer: AuthAccount) {
        if signer.borrow<&FormulaOne.Collection>(from: FormulaOne.CollectionStoragePath) == nil {
            let collection <- FormulaOne.createEmptyCollection()

            signer.save(<-collection, to: FormulaOne.CollectionStoragePath)

            signer.link<&FormulaOne.Collection{NonFungibleToken.CollectionPublic, FormulaOne.MomentNFTCollectionPublic}>(
                FormulaOne.CollectionPublicPath,
                target: FormulaOne.CollectionStoragePath
            )
        }
    }
}
