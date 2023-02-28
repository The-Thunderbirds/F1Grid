import { FormulaOnePacks } from "src/constants";

export const getPackByID = 
`
import FormulaOnePacks from ${FormulaOnePacks}

pub fun main(id: UInt64): FormulaOnePacks.Pack?  {

    return FormulaOnePacks.getPackById(packID: id)
}
`