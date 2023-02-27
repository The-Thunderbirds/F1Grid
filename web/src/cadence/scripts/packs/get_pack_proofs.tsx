import { FormulaOnePacks } from "src/constants";

export const getPackProofs = 
`
import FormulaOnePacks from ${FormulaOnePacks}


pub fun main(address: Address): [UInt64]? {
    let account = getAccount(address)
    let ref = account.getCapability(/public/FormulaOneProofPacksCollection).borrow<&{FormulaOnePacks.PackProofPublic}>()

    return ref?.getIDs()
}
`