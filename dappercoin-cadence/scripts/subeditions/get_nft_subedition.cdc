import FormulaOne from 0xf8d6e0586b0a20c7

pub fun main(nftID: UInt64): UInt32 {

    let subedition = FormulaOne.getMomentsSubedition(nftID: nftID)
                ?? panic("Could not find the specified moment")
    return subedition
}