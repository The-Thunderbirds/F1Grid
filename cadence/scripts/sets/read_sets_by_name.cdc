import FormulaOne from 0xf8d6e0586b0a20c7

pub fun main(setName: String): FormulaOne.SetData {
    return FormulaOne.getSetDataByName(name: setName)
}