import {FormulaOne} from "src/constants";

export const readAllSeries = 
`
import FormulaOne from ${FormulaOne}

pub fun main(): [FormulaOne.SeriesData] {
    let series: [FormulaOne.SeriesData] = []
    var id: UInt64 = 1

    while id < FormulaOne.nextSeriesID {
        series.append(FormulaOne.getSeriesData(id: id))
        id = id + 1
    }
    return series
}`