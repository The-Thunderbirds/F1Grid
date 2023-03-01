import {FormulaOneMarket, FormulaOneMarketPlaceUsers, PuddleV1} from "@/constants";

export const getTotalDrops = 
`
import FormulaOneMarketPlaceUsers from ${FormulaOneMarketPlaceUsers}

pub fun main(): UInt64 {

    return FormulaOneMarketPlaceUsers.getTotalDrops()
}
 
`