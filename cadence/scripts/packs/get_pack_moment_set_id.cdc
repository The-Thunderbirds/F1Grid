import FormulaOnePacks from 0xf8d6e0586b0a20c7

pub fun main(sellerAddress: Address, momentID: UInt64): UInt32 {

    let saleRef = getAccount(sellerAddress).getCapability(/public/FormulaOnePacksCollection)
        .borrow<&{FormulaOnePacks.PacksPublic}>()
        ?? panic("Could not get public sale reference")

    let token = saleRef.borrowMoment(id: momentID)
        ?? panic("Could not borrow a reference to the specified moment")

    let data = token.data

    return data.setID
}