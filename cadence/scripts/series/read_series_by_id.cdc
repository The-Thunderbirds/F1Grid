import FormulaOne from 0xf8d6e0586b0a20c7

pub fun main(id: UInt64): FormulaOne.SeriesData {
    return FormulaOne.getSeriesData(id: id)
}