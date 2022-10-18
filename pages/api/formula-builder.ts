// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface ISuggestionItem {
    field: string;
    moduleName: string;
    path: string;
    keyword: string;
    submodule: string;
}

type Data = {
  data: ISuggestionItem[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ data: [] })
}
