import FormulaOne from 0xf8d6e0586b0a20c7

pub fun main(): [FormulaOne.EditionData] {
    let editions: [FormulaOne.EditionData] = []
    var id: UInt64 = 1
    
    while id < FormulaOne.nextEditionID {
        editions.append(FormulaOne.getEditionData(id: id))
        id = id + 1
    }
    return editions
}