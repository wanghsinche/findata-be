// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { EStatement, IFinvizStatement } from '../../types/finviz';
import { getUserPlan } from '../../utils/stripe';
import { coverSomething } from '../../utils/common';
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
  const email = req.query.email as string;

  if (!ticker || !sheet) return res.status(400).end();

  const userPlan = await getUserPlan(email)

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
  console.log(userPlan)
  if (userPlan.plan === 'Free') coverSomething(sheetData)

  res.status(200).json({
    ticker, sheetData
  })
}
