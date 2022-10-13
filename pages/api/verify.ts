// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserPlan } from '../../utils/stripe';

interface IResult {
    email: string;
    plan: string;
    expiration: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResult>
) {
  const email = req.query.email as string

  if (!email) return res.status(400).json({
    email, plan:'', expiration: 0
  })
  
  try {
    const result = await getUserPlan(email);
    return res.status(200).json(result)

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      email, plan:'', expiration: 0
    })
  }


}
