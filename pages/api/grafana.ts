import type { NextApiRequest, NextApiResponse } from 'next'
import Joi, { number } from 'joi'
import { getFromCacheOrRetrieveFromRemote } from '../../utils/cache';
import { DataFrame } from '../../types/grafana';
import { EModule, getRealtimeYahooFinanceData, getYahooFinanceData } from '../../utils/yahoo';
interface IResult {
    error?: string;
    sheetData: unknown;
}

const schema = Joi.object({
    moduleName: Joi.string().required().valid(...Object.values(EModule)),
    tick: Joi.string().required(),
    modules: Joi.array().items(Joi.string()),
    from: Joi.alternatives(Joi.string(), Joi.number()),
    to: Joi.alternatives(Joi.string(), Joi.number()),
    interval: Joi.string().equal('1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h', '1d', '5d', '1wk', '1mo', '3mo')
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IResult>
) {
    const query = req.method === 'POST' ? req.body:req.query

    if (typeof query.modules === 'string') {
        query.modules = [query.modules]
    }

    const { error } = schema.validate(query)
    if (error) return res.status(400).json({ error: error.message, sheetData: [] })

    // convert to number
    query.from = numericLiteralToDate(query.from)
    query.to = numericLiteralToDate(query.to)

    if (query.moduleName === EModule.historical) {
        const sheetData = await getRealtimeYahooFinanceData(EModule.historical, query.tick as string, {
            period1: query.from,
            period2: query.to
        })

        return res.status(200).json({
            sheetData: sheetData
        })
    }

    if (query.moduleName === EModule.quoteSummary) {
        const sheetData = await getRealtimeYahooFinanceData(EModule.quoteSummary, query.tick as string, {
            modules: query.modules
        })

        return res.status(200).json({
            sheetData: sheetData
        })

    }

    if (query.moduleName === EModule.chart) {
        const startOfTheDate = new Date().toDateString();

        const sheetData = await getRealtimeYahooFinanceData(EModule.chart, query.tick as string, {
            period1: query.from || startOfTheDate,
            period2: query.to,
            interval: query.interval
        })

        return res.status(200).json({
            sheetData: sheetData
        })

    }

    return res.status(400).json({ error: 'invalid option', sheetData: [] })
}

function numericLiteralToDate(n?:number|string){
    if (typeof n === 'number') return new Date(n)
    if (typeof n === 'string' && !isNaN(Number(n))) return new Date(Number(n))
    return n
}