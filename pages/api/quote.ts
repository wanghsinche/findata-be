// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { IFinvizQuote } from '../../types/finviz';
import { formatDate } from '../../utils/date';
const finvizURL = 'https://finviz.com/api/quote.ashx';

type TCell = string|number;

export default async function quote(
  req: NextApiRequest,
  res: NextApiResponse<{
    ticker: string;
    sheetData: TCell[][]
  }>
) {
  const ticker = req.query.ticker as string;
  if (!ticker) return res.status(400).end();

  const query = new URLSearchParams();
  query.set('aftermarket', 'false');
  query.set('instrument', 'stock');
  query.set('patterns', 'true');
  query.set('premarket','false');
  query.set('rev', String(Date.now()));
  query.set('timeframe', 'd');
  query.set('type', 'new');
  query.set('ticker', ticker);

  const finvizRes = await axios.get(`${finvizURL}?${query.toString()}`)
  const finvizData = finvizRes.data as IFinvizQuote;
  // convert to sheet data

  const sheetData: TCell[][] = [[
    'date', 'open', 'high', 'low', 'close'
  ]];
  finvizData.date.forEach((d, idx)=>{
    sheetData.push([
       formatDate(new Date(d*1000)),
       finvizData.open[idx],
       finvizData.high[idx],
       finvizData.low[idx],
       finvizData.close[idx],
    ])
  })

  res.status(200).json({sheetData, ticker});
}
