import fs from 'fs'
import path from 'path'

const appendToPath = false
const name = 'quote-summary-balance-sheet-history'

const fileName = path.resolve(__dirname, `${name}.csv`)
const outFileName = path.resolve(__dirname, `${name}.txt`)

const fileContent = fs.readFileSync(fileName, {encoding:'utf-8'})

const rows = fileContent.split('\n').filter(el=>!!el.trim())

const xTicker = rows[0]

const sheetText = rows.map((rowText, idx)=>{
    if (idx === 0) return rowText
    
    const row:string[] = rowText.split(',')

    const key = row[0].split(':')[0]?.replace('?','')

    const moduleName= row[1].trim()
    const realPath = appendToPath?`${row[2]}.${key}`:row[2].trim()
    const keyword = row[3].trim() || camelToWords(key)
    const subModule = row[4].trim()

    return [row[0], moduleName, realPath, keyword, subModule].join(',')+','
}).join('\n')



function camelToWords(str:string){
    return str.replace(/([a-z])([A-Z])/g, '$1 $2')
}

fs.writeFileSync(outFileName, sheetText)