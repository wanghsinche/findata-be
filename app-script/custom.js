/**
 * Imports unlimited data from yahoo finance. See complete documentation at https://findata-be.uk
 * 
 * @param {string} moduleName moduleName: historical, quote, quoteSummary, etc 
 * @param {string} ticker ticker: AAPL, TSLA.
 * @param {*[][]} queryOption queryOption: See complete documentation at https://findata-be.uk example: {"modules","cashflowStatementHistory"}.
 * @param {string} expand expand: Expand a specific part from the result, use empty string "" if you don't need it. example: a.b[0].c .
 * @param {string} columns columns: Select specific parts from the result. example: col1, col2, col3 .
 * @return The asked information from the data source.
 * @customfunction
 */
function FinData(moduleName, ticker, queryOption = [], expand='', columns='' ){
    let param = {}
    if (queryOption instanceof Array) {
        param = twoDArrayToRecord(queryOption)
    }

    return getYahooFinance(moduleName, ticker, param, expand, columns)
}
