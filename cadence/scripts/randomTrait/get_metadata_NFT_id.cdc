import ExampleNFT from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7
import MetadataViews from 0xf8d6e0586b0a20c7

pub fun main(account: Address, id: UInt64): AnyStruct?? {

    let collectionRef = getAccount(account).getCapability(/public/exampleNFTCollection)
        .borrow<&{ExampleNFT.ExampleNFTCollectionPublic}>()
        ?? panic("Could not get public moment collection reference")

    let token = collectionRef.borrowExampleNFT(id: id)

    let data = token

    let traitsView = token?.resolveView(Type<MetadataViews.Traits>())

    return traitsView
}