import FormulaOne from 0xf8d6e0586b0a20c7

pub fun main(): [FormulaOne.SeriesData] {
    let series: [FormulaOne.SeriesData] = []
    var id: UInt64 = 1

    while id < FormulaOne.nextSeriesID {
        series.append(FormulaOne.getSeriesData(id: id))
        id = id + 1
    }
    return series
}