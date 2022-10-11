// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { EStatement, IFinvizStatement } from '../../types/finviz';
const finvizURL = 'https://finviz.com/api/statement.ashx';

type TCell = string|number;


export default async function statement(
  req: NextApiRequest,
  res: NextApiResponse<{
    ticker: string;
    sheetData: TCell[][];
  }>
) {
  const ticker = req.query.ticker as string;
  const sheet = req.query.sheet as EStatement;

  if (!ticker || !sheet) return res.status(400).end();

  const query = new URLSearchParams();
  query.set('s', sheet);
  query.set('t', ticker);

  const finvizRes = await axios.get(`${finvizURL}?${query.toString()}`)
  const finvizData = finvizRes.data as IFinvizStatement;

  const sheetData:TCell[][] = [['',...finvizData.data['Period End Date']]];

  Object.entries(finvizData.data).forEach(([k, v])=>{
    if (k === 'Period End Date') return
    sheetData.push([k, ...v])
  })

  res.status(200).json({
    ticker, sheetData
  })
}
