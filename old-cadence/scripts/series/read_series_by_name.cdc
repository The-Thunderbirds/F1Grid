import FormulaOne from 0xf8d6e0586b0a20c7

pub fun main(seriesName: String): FormulaOne.SeriesData {
    return FormulaOne.getSeriesDataByName(name: seriesName)
}