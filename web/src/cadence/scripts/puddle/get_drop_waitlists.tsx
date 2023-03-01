import {FormulaOneMarket, FormulaOneMarketPlaceUsers, PuddleV1} from "@/constants";

export const getDropWaitlists = 
`
import FormulaOneMarketPlaceUsers from ${FormulaOneMarketPlaceUsers}

pub fun main(): {UInt64: [Address]} {

    return FormulaOneMarketPlaceUsers.getDropWaitlists()
}
`