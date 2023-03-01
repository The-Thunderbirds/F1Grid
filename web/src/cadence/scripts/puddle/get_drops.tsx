import {FormulaOneMarket, FormulaOneMarketPlaceUsers, PuddleV1} from "@/constants";

export const getDrops = 
`
import FormulaOneMarketPlaceUsers from ${FormulaOneMarketPlaceUsers}

pub fun main(): {UInt64: FormulaOneMarketPlaceUsers.Drop} {

    return FormulaOneMarketPlaceUsers.getDrops()
}
 
`