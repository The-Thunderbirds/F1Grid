import FormulaOnePacks from 0xf8d6e0586b0a20c7

pub fun main(address: Address, id: UInt64): UInt64? {
    let account = getAccount(address)
    let ref = account.getCapability(/public/FormulaOneProofPacksCollection).borrow<&{FormulaOnePacks.PackProofPublic}>()

    return ref?.borrowPackProof(id: id)?.packID
}