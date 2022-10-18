/**
 * Imports unlimited data from yahoo finance. See complete documentation at https://github.com/gadicc/node-yahoo-finance2/tree/devel/docs#yahoo-finance-docs
 *
 * @param {string} moduleName moduleName: history, quote, quoteSummary, etc 
 * @param {string} ticker ticker: AAPL, TSLA.
 * @param {string} path path: Use * to select all or select specific part from the result, for example: a.b[0].c 
 * @param {*[][]} [queryOption] queryOption: See complete documentation at https://github.com/gadicc/node-yahoo-finance2/tree/devel/docs#yahoo-finance-docs
 * @return The asked information the source.
 * @customfunction
 */
function FinData(moduleName, ticker, path='*', queryOption = []){
    if (!(queryOption instanceof Array)) throw 'queryOption should be Array'
    /**
     * queryOption [key, value][]  ==> {}
     */
    if (!queryOption.every(el=>el instanceof Array)) throw 'queryOption value should be Array'
    const param = queryOption.reduce((am, [k, ...value])=>{
        am[k] = value.length > 1? value: value[0]
        return am
    }, {})

    return getYahooFinance(moduleName, ticker, param, path)

}