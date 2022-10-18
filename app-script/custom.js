/**
 * Imports unlimited data from yahoo finance. See complete documentation at https://github.com/gadicc/node-yahoo-finance2/tree/devel/docs#yahoo-finance-docs
 *
 * @param {string} moduleName moduleName: history, quote, quoteSummary, etc 
 * @param {string} ticker ticker: AAPL, TSLA.
 * @param {*} [queryOption] queryOption: See complete documentation at https://github.com/gadicc/node-yahoo-finance2/tree/devel/docs#yahoo-finance-docs
 * @param {string} [expand] expand: expand a specific part from the result, for example: a.b[0].c, use empty string "" if you don't need it
 * @param {string} [columns] columns: select specific parts from the result, for example: col1, col2, col3
 * @return The asked information the source.
 * @customfunction
 */
function FinData(moduleName, ticker, queryOption = [], expand='', columns='' ){
    let param = {}
    if (queryOption instanceof Array) {
        param = twoDArrayToRecord(queryOption)
    }
    if (typeof queryOption === 'string'){
        param = stringToRecord(queryOption)
    }

    return getYahooFinance(moduleName, ticker, param, expand, columns)

}