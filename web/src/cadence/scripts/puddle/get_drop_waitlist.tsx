import {FormulaOneMarket, FormulaOneMarketPlaceUsers, PuddleV1} from "@/constants";

export const getDropWaitlist = 
`
import FormulaOneMarketPlaceUsers from ${FormulaOneMarketPlaceUsers}

pub fun main(id: UInt64): [Address]? {

    return FormulaOneMarketPlaceUsers.getDropWaitlist(id: id)
}
`