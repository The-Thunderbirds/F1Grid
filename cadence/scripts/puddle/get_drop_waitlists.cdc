import FormulaOneMarketPlaceUsers from 0xf8d6e0586b0a20c7

pub fun main(id: UInt64): {UInt64: [Address]} {

    return FormulaOneMarketPlaceUsers.getDropWaitlists()
}