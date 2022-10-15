/**
 * Imports mutual fund NAV or other data from Morningstar. See complete documentation at mufunds.com.
 *
 * @param {string} ticker ticker: AAPL, TSLA.
 * @param {string} attribute attribute: "date", "open", "close", "volumn", "hign".
 * @param {string} startDate startDate: 2020-01-01.
 * @param {string} endDate endDate: 2020-11-01.
 * @return The asked information from the fund, according to the selected source.
 * @customfunction
 */
function findata_quote(ticker, attribute, startDate, endDate){
    console.log(ticker, attribute, startDate, endDate)
    console.log(typeof attribute)
    const sheetData = generateQuote(ticker)
    const startDateNum = new Date(startDate).valueOf()
    const endDateNum = new Date(endDate).valueOf()
    const periodFiltered = sheetData.filter((el, idx)=>{
        if (idx === 0) return false
        const d = new Date(el[0]).valueOf()
        if (startDateNum <= d) {
            if (!endDate) return true
            return d <= endDateNum
        }
        return false
    })


    const attributeIdx = sheetData[0].findIndex(el=>el===attribute)
    

    return periodFiltered.map(el=>el.filter((v, idx)=>attributeIdx===idx))

}