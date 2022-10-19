export interface ISchema {
    fieldName: string;
    path: string;
    moduleName: string;
    subModule: string;
    keyword: string;
    title: string;
}

export function camelToWords(str:string){
    const t = str.replace(/([a-z])([A-Z])/g, '$1 $2')
    return t[0].toUpperCase()+t.slice(1)
}

export function removeImportString(str:string){
    if (str.startsWith('import') && str.includes('.'))    return str.split('.').pop()?.replace('| undefined','').trim() as string
    return str
}

