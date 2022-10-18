require('dotenv').config();

import {supabaseServer} from '../utils/supabase-admin'
import fs from 'fs'
import path from 'path'

const name = 'quote-summary-asset-profile'

const fileName = path.resolve(__dirname, `${name}.txt`)

const fileContent = fs.readFileSync(fileName, {encoding:'utf-8'})
const rows = fileContent.split('\n').filter(el=>!!el.trim())

const xTicker = rows.shift()?.split(',') as string[]

async function importDB(){
    const data = rows.map(row=>{
        const obj:Record<string, string> = row.split(',').reduce((acm, v, idx)=>{
            const k = xTicker[idx]?.trim()
            if (!k) return acm
            acm[k] = v
            return acm
        }, {} as Record<string, string>)
        
        return obj
    })

    console.log(data)

    const {  error } = await supabaseServer
    .from('autocomplete')
    .insert(data)
  
    console.log(error)
}

importDB().then(e=>console.log(e))