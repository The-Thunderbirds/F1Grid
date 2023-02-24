import FormulaOne from 0xf8d6e0586b0a20c7

pub fun main(): [FormulaOne.PlayData] {
    let plays: [FormulaOne.PlayData] = []
    var id: UInt64 = 1
    
    while id < FormulaOne.nextPlayID {
        plays.append(FormulaOne.getPlayData(id: id))
        id = id + 1
    }
    return plays
}