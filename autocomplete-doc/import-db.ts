require('dotenv').config();

import { supabaseServer } from '../utils/supabase-admin'
import fs from 'fs'
import path from 'path'
import { ISchema } from './common';


async function importDB(filename: string) {

    const fileName = path.resolve(__dirname, `${filename}`)

    const fileContent = fs.readFileSync(fileName, { encoding: 'utf-8' })
    const rows: ISchema[] = JSON.parse(fileContent)



    const { error } = await supabaseServer
        .from('autocomplete')
        .insert(rows)

    console.log(error)
}



['historical.json', 'quote.json', 'quoteSummary.json'].forEach(filename => {

    importDB(filename).then(e => console.log(e))

})
