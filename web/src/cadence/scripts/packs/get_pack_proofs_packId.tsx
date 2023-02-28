import { FormulaOnePacks } from "src/constants";

export const getPackIDbyPackProof = 
`
import FormulaOnePacks from ${FormulaOnePacks}

pub fun main(address: Address, id: UInt64): UInt64? {
    let account = getAccount(address)
    let ref = account.getCapability(/public/FormulaOneProofPacksCollection).borrow<&{FormulaOnePacks.PackProofPublic}>()

    return ref?.borrowPackProof(id: id)?.packID
}
`