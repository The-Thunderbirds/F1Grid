import {FormulaOneMarket, FormulaOneMarketPlaceUsers, PuddleV1} from "@/constants";

export const getDrop = 
`
import FormulaOneMarketPlaceUsers from ${FormulaOneMarketPlaceUsers}

pub fun main(id: UInt64): FormulaOneMarketPlaceUsers.Drop? {

    return FormulaOneMarketPlaceUsers.getDrop(id: id)
}
 
`