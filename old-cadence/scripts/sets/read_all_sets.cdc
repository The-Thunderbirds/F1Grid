import FormulaOne from 0xf8d6e0586b0a20c7

pub fun main(): [FormulaOne.SetData] {
    let sets: [FormulaOne.SetData] = []
    var id: UInt64 = 1

    while id < FormulaOne.nextSetID {
        sets.append(FormulaOne.getSetData(id: id))
        id = id + 1
    }
    return sets
}