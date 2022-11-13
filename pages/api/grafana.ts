import type { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'
import { getFromCacheOrRetrieveFromRemote } from '../../utils/cache';
import { DataFrame } from '../../types/grafana';
import { EModule, getYahooFinanceData } from '../../utils/yahoo';
interface IResult {
    error?: string;
    sheetData: unknown;
}

const schema = Joi.object({
    moduleName: Joi.string().required().valid(...Object.values(EModule)),
    tick: Joi.string().required(),
    modules: Joi.array().items(Joi.string()),
    start: Joi.string(),
    end: Joi.string()
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IResult>
) {
    const query = req.query
    const { error } = schema.validate(query)
    if (error) return res.status(400).json({ error: error.message, sheetData: [] })

    if (query.moduleName === EModule.historical) {
        const sheetData = await getYahooFinanceData(EModule.historical, query.tick as string, {
            period1: query.start,
            period2: query.end
        })

        return res.status(200).json({
            sheetData: sheetData
        })
    }

    if (query.moduleName === EModule.quoteSummary) {
        const sheetData = await getYahooFinanceData(EModule.quoteSummary, query.tick as string, {
            modules: query.modules
        })

        return res.status(200).json({
            sheetData: sheetData
        })

    }

    return res.status(400).json({ error: 'invalid option', sheetData: [] })
}

