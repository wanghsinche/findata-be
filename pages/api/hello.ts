// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getLimiter } from '../../utils/limiter'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const email = req.query.email as string

  if (!email) return res.status(401).json({name:''})
  
  const reachLimitFunc = getLimiter(5, 2)

  const isLimited = await reachLimitFunc(email)

  if (isLimited) return res.status(400).json({name:''})


  res.status(200).json({ name: email })
}
