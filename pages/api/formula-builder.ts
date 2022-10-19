// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { searchField } from '../../utils/supabase-admin';

interface ISuggestionItem {
    field: string;
    moduleName: string;
    path: string;
    title: string;
    submodule: string;
}

type Data = {
  word: string;
  data: ISuggestionItem[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const word = req.query.word as string
  if (!word.trim()) return res.json({data:[], word})
  const data = await searchField(word.trim())
  return res.json({data, word})
}
