import yahooFinance from 'yahoo-finance2';
import { getCache } from './cache'

export enum EModule {
    historicalc='historical', // - historical market prices.
    quote='quote',// - essential symbol info.
    quoteSummary='quoteSummary', // - comprehensive symbol info.
    // search='search',// - symbol lookup, news and articles.
    recommendationsBySymbol='recommendationsBySymbol',// - similar symbols.
    trendingSymbols='trendingSymbols',// - symbols trending in a country.
    options='options',// - options trading (call/put).
    insights='insights',// - insights and scores.
}

const YHModuleMap:Partial<Record<EModule, (query:string, option: unknown)=>unknown>> = {
    [EModule.historicalc]: (query:string, rawOption: unknown)=>{

        const option = {...rawOption as Record<string, unknown>}

        const endTime = option.period2 as string || new Date().toDateString()
        const earliest = new Date(endTime)
        
        earliest.setUTCFullYear(earliest.getUTCFullYear()-3) // three years ago


        if (new Date(option.period1 as string).valueOf() < earliest.valueOf() ) {
            option.period1 = earliest.toDateString()
        }

        return yahooFinance.historical(query, option as any)
    },
    [EModule.quote]:(query:string, option: unknown)=>yahooFinance.quote(query, option as any),
    [EModule.quoteSummary]:(query:string, option: unknown)=>yahooFinance.quoteSummary(query, option as any),
    // [EModule.search]:(query:string, option: unknown)=>yahooFinance.search(query, option as any),
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
    
    let cache 

    try {
        cache = await getCache()

        const cacheData = await cache.get(key)
    
        if (cacheData) return cacheData

    } catch (error) {
        console.error(error)        
    }

    const data = await (YHModuleMap[moduleName] as any)(query, adjustQueryOptions(queryOption) as any)

    try {
        if (cache) {
            await cache.set(key, data)
        }
    } catch (error) {
        console.error(error)
    }


    return data
}
