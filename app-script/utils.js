
function hashFunc(text) {
    var hash = 0,
        i, chr;
    if (text.length === 0) return hash;
    for (i = 0; i < text.length; i++) {
        chr = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str);
    return d instanceof Date && !isNaN(d) && d.toISOString() === str; // valid date 
}

function convertDate(k, value) {
    if (typeof value === 'string' && isIsoDate(value)) {
        return new Date(value)
    }
    return value
}

const expirationInSeconds = 300

function getFromCacheOrServer(quoteURL) {
    const key = String(hashFunc(quoteURL))
    let quoteRes = '';
    const cache = CacheService.getScriptCache();
    if (cache.get(key)) {
        process.env.NODE_ENV === 'test' && console.log(`cache hits at ${key}`)
        quoteRes = cache.get(key)
    } else {
        quoteRes = UrlFetchApp.fetch(quoteURL).getContentText();
        cache.put(key, quoteRes, expirationInSeconds)
    }
    return quoteRes
}


function stringToRecord(str){
    const jsonStr = str.replace(/\,/g,':')
    return JSON.parse(jsonStr)
}

function twoDArrayToRecord(queryOption){
    return param = queryOption.reduce((am, [k, ...value])=>{
        am[k] = value.length > 1? value: value[0]
        return am
    }, {})
}