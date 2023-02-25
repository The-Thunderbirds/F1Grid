import FormulaOne from 0xf8d6e0586b0a20c7
import MetadataViews from 0xf8d6e0586b0a20c7


pub fun main(address: Address, id: UInt64): FormulaOne.FormulaOneMomentMetadataView {
    let account = getAccount(address)

    let collectionRef = account.getCapability(/public/MomentCollection)
                            .borrow<&{FormulaOne.MomentCollectionPublic}>()!

    let nft = collectionRef.borrowMoment(id: id)!
    
    // Get the Formula One specific metadata for this NFT
    let view = nft.resolveView(Type<FormulaOne.FormulaOneMomentMetadataView>())!

    let metadata = view as! FormulaOne.FormulaOneMomentMetadataView
    
    return metadata
}