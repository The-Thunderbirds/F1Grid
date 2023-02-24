import {NonFungibleToken, FormulaOne} from "src/constants";

export const setupFormulaOneAccount = 
`
import NonFungibleToken from ${NonFungibleToken}
import FormulaOne from ${FormulaOne}

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
`