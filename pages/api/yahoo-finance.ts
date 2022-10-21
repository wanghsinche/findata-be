import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserPlan } from '../../utils/stripe';
import { get, primitiveData, tabularData, TCell } from '../../utils/common';
import Joi from 'joi'
import { EModule, getYahooFinanceData } from '../../utils/yahoo'
import { getLimiter } from '../../utils/limiter';
import { freeLimitation } from '../../utils/constant';
import { getFromCacheOrRetrieveFromRemote } from '../../utils/cache';

interface IResult {
    error?: string;
    ticker: string;
    sheetData: TCell[][];
}



const schema = Joi.object({
    moduleName: Joi.string().required().valid(...Object.values(EModule)),
    query: Joi.string().required(),
    queryOptions: Joi.object(),
    expand: Joi.string().allow(''),
    columns: Joi.string().allow('')
})


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IResult>
) {
    // if (req.method !== 'POST') return res.status(400).json({ticker:'', sheetData: [], error:`Only For POST, but get ${req.method}`})

    let body = req.body

    // fix the google app script problem
    if (req.method === 'GET') {
        try {
            body = JSON.parse(req.query.json as string)
        } catch (err) {
            console.error(err)
        }
    }
    const email = req.query.email as string;
    const { error } = schema.validate(body)

    if (error) return res.status(400).json({ ticker: '', sheetData: [], error: error.message })

    const oneDaySecs = 3600 * 24

    const limiterFunc = getLimiter(oneDaySecs, freeLimitation)

    const userPlan = await getFromCacheOrRetrieveFromRemote('userPlan_'+email, ()=>getUserPlan(email), 30) // 10sec


    if (userPlan?.plan === 'Free' && await limiterFunc(email)) {
        res.status(400).json({ ticker: '', sheetData: [], error: `Free user can have ${freeLimitation} queries everyday` })
        return
    }

    const moduleName = body.moduleName as EModule
    const query = body.query as string
    const queryOptions = body.queryOptions as Record<string, unknown>
    const expand = body.expand as string
    const columns = body.columns as string

    let data

    try {
        data = await getYahooFinanceData(moduleName, query, queryOptions)
    } catch (err) {
        return res.status(400).json({ ticker: '', sheetData: [], error: String(err) })
    }



    const result = expand === '*' || !expand ? data : get(data as any, expand, null) as unknown

    if (!result) return res.status(200).json({
        ticker: query, sheetData: []
    })

    const sheetData = selectColumns(convertToSheetData(result), columns)

    res.status(200).json({
        ticker: query, sheetData: sheetData
    })
}


function convertToSheetData(result: unknown) {
    if (result instanceof Array) return tabularData(result)

    if (typeof result === 'object') return tabularData([result as Record<string, unknown>])

    return [[primitiveData(result)]]
}

function selectColumns(sheetData: TCell[][], columns: string) {
    if (!columns) return sheetData
    const xTicker = sheetData[0] as string[]

    return sheetData.map(row => pick(row, columns, xTicker))
}

function pick(row: TCell[], columns: string, xTicker: string[]) {
    return columns.split(',').map(col => {
        const idx = xTicker.findIndex(t => t === col)
        if (idx === -1) return ''
        return row[idx]
    })
}