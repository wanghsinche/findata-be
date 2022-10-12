// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyEmail } from '../../utils/supabase-admin'

interface IResult {
    result: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResult>
) {
  const email = req.query.email as string

  if (!email) return res.status(400).json({result:false})
  
  const result = await verifyEmail(email);

  return res.status(200).json({result:!!result})
}
