// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { IFinvizQuote } from '../../types/finviz';
const finvizURL = 'https://finviz.com/api/quote.ashx';

export default async function quote(
  req: NextApiRequest,
  res: NextApiResponse<IFinvizQuote>
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

  res.status(200).json(finvizRes.data);
}
