import fs from 'fs'
import path from 'path'

import { InterfaceDeclaration, Project, ts } from "ts-morph";
import { camelToWords, ISchema, removeImportString } from './common';
const project = new Project({
    tsConfigFilePath: "tsconfig.json",
    skipAddingFilesFromTsConfig: true,
});

const moduleName = 'historical'

const stopWords = [
    'date','period1','period2','interval','events','includeAdjustedClose',
]

const fileNamePath = `node_modules/yahoo-finance2/dist/esm/src/modules/${moduleName}.d.ts`
const fileName = `${moduleName}.d.ts`

const output:ISchema[] = []

interface IntermediateOutput extends Omit<ISchema, 'keyword'>{
    keyword: Set<string>
}

project.addSourceFileAtPath(fileNamePath);

const sourceFile = project.getSourceFileOrThrow(fileName);


sourceFile.getInterfaces().forEach(it=>{
    const typeName = camelToWords(removeImportString(it.getType().getText()))
    const title = camelToWords(it.getName())
    const keyword = new Set<string>()
    keyword.add(title)
    keyword.add(typeName);
    
    output.push(...interfaceOrPrimitive(it, '', keyword).map(el=>({
        ...el,
        keyword: Array.from(el.keyword.values()).join(' ')
    })))
})

fs.writeFileSync(path.resolve(__dirname, `${moduleName}.json`), JSON.stringify(output, null, 2))

function interfaceOrPrimitive(it: InterfaceDeclaration, prefix: string, keyword: Set<string>){
    /**
     * traverse until it is not interface
     * return the path array
     */
    const result = [] as IntermediateOutput[]
    it.getProperties().forEach(prop=>{
        const field = prop.getName()
        if (stopWords.includes(field)) return


        const typeName = camelToWords(removeImportString(it.getType().getText()))
        const title = camelToWords(field)

        keyword.add(title)
        keyword.add(typeName)

        

        result.push({
            path: '',
            moduleName,
            submodule:'',
            keyword,
            title,
            field: prop.getName(),
        })
        
    })

    return result
}