import FormulaOne from 0xf8d6e0586b0a20c7

pub fun main(editionID: UInt64): FormulaOne.EditionData {
    return FormulaOne.getEditionData(id: editionID)
}