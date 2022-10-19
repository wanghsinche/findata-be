import fs from 'fs'
import path from 'path'

import { InterfaceDeclaration, Project, PropertySignature, ts, Type } from "ts-morph";
import { camelToWords, ISchema, removeImportString } from './common';
const project = new Project({
    tsConfigFilePath: "tsconfig.json",
    skipAddingFilesFromTsConfig: true,
});

const moduleName = 'quoteSummary'

const stopWords = [
    'maxAge','date','fields','return','period','quarter','endDate','Date'
]

const fileNamePath = `node_modules/yahoo-finance2/dist/esm/src/modules/${moduleName}-iface.d.ts`
const fileName = `${moduleName}-iface.d.ts`

const output:ISchema[] = []

project.addSourceFileAtPath(fileNamePath);

const sourceFile = project.getSourceFileOrThrow(fileName);

function getInterfaceType(it:PropertySignature){
    if (it.getType().isInterface()) return it.getType()
    if (it.getType().getArrayElementType()?.isInterface()) return it.getType().getArrayElementType() as Type<ts.Type>
    if(it.getType().getUnionTypes().some(el=>el.isInterface())) return it.getType().getUnionTypes().find(el=>el.isInterface()) as Type<ts.Type>

    
}

function isInterface(it:PropertySignature){
    if (it.getType().isInterface()) return true
    if(it.getType().getUnionTypes().some(el=>el.isInterface())) return true
    if (it.getType().getArrayElementType()?.isInterface()) return true
}


sourceFile.getInterface('QuoteSummaryResult')?.getProperties().forEach(it=>{
    const t = getInterfaceType(it)
    if (!t) return

    const interfaceName = removeImportString(t.getText())


    const subModule = it.getName()
    
    const typeName = camelToWords(interfaceName)

    const title = camelToWords(it.getName())
    const keyword = title + ' ' + typeName;
    
    output.push(...interfaceOrPrimitive(sourceFile.getInterface(interfaceName)!, subModule, keyword, subModule))
})

fs.writeFileSync(path.resolve(__dirname, `${moduleName}.json`), JSON.stringify(output, null, 2))

function interfaceOrPrimitive(it: InterfaceDeclaration, prefix: string, keyword: string, subModule:string){
    /**
     * traverse until it is not interface
     * return the path array
     */
    const result = [] as ISchema[]
    it.getProperties().forEach(prop=>{
        const field = prop.getName()
        if (stopWords.includes(field)) return


        const p = (prefix?(prefix+'.'):'')+field
        const typeName = camelToWords(removeImportString(it.getType().getText()))
        const title = camelToWords(field)

        const newKeyword = keyword + ' ' +title + ' ' + typeName;
        
        if (isInterface(prop)){
            const t = getInterfaceType(prop)
            if (!t) return

            const interfaceName = removeImportString(t.getText())

            if (stopWords.includes(interfaceName)) return

            if (sourceFile.getInterface(interfaceName)){
                result.push(...interfaceOrPrimitive(sourceFile.getInterface(interfaceName)!, p, newKeyword, subModule))
            } else {
                console.log('can not find '+interfaceName)
            }

            return
        }
        

        result.push({
            path: p,
            moduleName,
            submodule: subModule,
            keyword: newKeyword,
            title,
            field: prop.getName(),
        })
        
    })

    return result
}