import yahooFinance from 'yahoo-finance2';
import { getCache } from './cache'

export enum EModule {
    historicalc='historical', // - historical market prices.
    quote='quote',// - essential symbol info.
    quoteSummary='quoteSummary', // - comprehensive symbol info.
    search='search',// - symbol lookup, news and articles.
    recommendationsBySymbol='recommendationsBySymbol',// - similar symbols.
    trendingSymbols='trendingSymbols',// - symbols trending in a country.
    options='options',// - options trading (call/put).
    insights='insights',// - insights and scores.
}

const YHModuleMap:Partial<Record<EModule, (query:string, option: unknown)=>unknown>> = {
    [EModule.historicalc]: (query:string, option: unknown)=>yahooFinance.historical(query, option as any),
    [EModule.quote]:(query:string, option: unknown)=>yahooFinance.quote(query, option as any),
    [EModule.quoteSummary]:(query:string, option: unknown)=>yahooFinance.quoteSummary(query, option as any),
    [EModule.search]:(query:string, option: unknown)=>yahooFinance.search(query, option as any),
    [EModule.recommendationsBySymbol]:(query:string, option: unknown)=>yahooFinance.recommendationsBySymbol(query, option as any),
    [EModule.trendingSymbols]: (query:string, option: unknown)=>yahooFinance.trendingSymbols(query, option as any),
    [EModule.options]:(query:string, option: unknown)=>yahooFinance.options(query, option as any),
    [EModule.insights]:(query:string, option: unknown)=>yahooFinance.insights(query, option as any),
}

function adjustQueryOptions(query: Record<string, unknown>){
    const arrayFields = ['modules', 'fields']
    Object.keys(query).forEach(k=>{
        if (arrayFields.includes(k) && !(query[k] instanceof Array)){
            query[k] = [query[k]]
        }
    })
    return query
}


export async function getYahooFinanceData(moduleName: EModule, query: string, queryOption: Record<string, unknown> ){
    const key = JSON.stringify({
        moduleName, query, queryOption
    })

    const cache = await getCache()

    const cacheData = await cache.get(key)

    if (cacheData) console.log('hit')

    if (cacheData) return cacheData

    const data = await (YHModuleMap[moduleName] as any)(query, adjustQueryOptions(queryOption) as any)

    await cache.set(key, data)

    return data
}
