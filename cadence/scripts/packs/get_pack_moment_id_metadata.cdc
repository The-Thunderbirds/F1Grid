import FormulaOne from 0xf8d6e0586b0a20c7
import FormulaOnePacks from 0xf8d6e0586b0a20c7

pub fun main(sellerAddress: Address, momentID: UInt64): {String: String} {

    let saleRef = getAccount(sellerAddress).getCapability(/public/FormulaOnePacksCollection)
        .borrow<&{FormulaOnePacks.PacksPublic}>()
        ?? panic("Could not get public sale reference")

    let token = saleRef.borrowMoment(id: momentID)
        ?? panic("Could not borrow a reference to the specified moment")

    let data = token.data

    // Use the moment's play ID 
    // to get all the metadata associated with that play
    let metadata = FormulaOne.getPlayMetaData(playID: data.playID) ?? panic("Play doesn't exist")

    return metadata
}