// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import yahoo from 'yahoo-finance2'
import { SearchQuoteYahoo } from 'yahoo-finance2/dist/esm/src/modules/search';


type Data = {
    word: string;
    data: SearchQuoteYahoo[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const word = req.query.word as string
    if (!word.trim()) return res.json({ data: [], word })

    const data = await yahoo.search(word, { enableEnhancedTrivialQuery: false, enableFuzzyQuery: false, enableNavLinks: false, newsCount: 0 })

    return res.json({ data: data.quotes as SearchQuoteYahoo[], word })

}
