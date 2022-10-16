import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserPlan } from '../../utils/stripe';
import { get, primitiveData, tabularData, TCell } from '../../utils/common';
import Joi from 'joi'
import yahooFinance from 'yahoo-finance2';


interface IResult {
    error?: string;
    ticker: string;
    sheetData: TCell[][];
}

enum EModule {
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

const schema = Joi.object({
    moduleName: Joi.string().required().allow(...Object.values(EModule)),
    query: Joi.string().required(),
    queryOptions: Joi.object(),
    path: Joi.string()
})

function adjustQueryOptions(query: Record<string, unknown>){
    const arrayFields = ['modules', 'fields']
    Object.keys(query).forEach(k=>{
        if (arrayFields.includes(k) && !(query[k] instanceof Array)){
            query[k] = [query[k]]
        }
    })
    return query
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResult>
){
    if (req.method !== 'POST') return res.status(400).json({ticker:'', sheetData: [], error:`Only For POST, but get ${req.method}`})

    const body = req.body
    const { error } = schema.validate(body)

    if (error) return res.status(400).json({ticker:'', sheetData: [], error: error.message})

    const moduleName = req.body.moduleName as EModule
    const query = req.body.query as string
    const queryOptions = req.body.queryOptions as Record<string, unknown>
    const path = req.body.path as string

    let data

    try {
        data = await (YHModuleMap[moduleName] as any)(query, adjustQueryOptions(queryOptions) as any)

    } catch (err) {
        return res.status(400).json({ticker:'', sheetData: [], error: String(err)})
    }
    
    const result = !path? data: get(data as any, path, null) as unknown

    if (!result) return res.status(200).json({
        ticker: query, sheetData: []
    })

    if (result instanceof Array) return res.status(200).json({
        ticker: query, sheetData: tabularData(result)
    })

    if (typeof result === 'object') return res.status(200).json({
        ticker: query, sheetData: tabularData([result as Record<string, unknown>])
    })

    return res.status(200).json({
        ticker: query, sheetData: [[primitiveData(result)]]
    })
}

