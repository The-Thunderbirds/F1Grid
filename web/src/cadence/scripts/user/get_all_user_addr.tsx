import {FormulaOneMarketPlaceUsers} from "@/constants";

export const getAllUsers = 
`
import FormulaOneMarketPlaceUsers from ${FormulaOneMarketPlaceUsers}

pub fun main(): [Address] {

    return FormulaOneMarketPlaceUsers.getAllUsers()
}
`