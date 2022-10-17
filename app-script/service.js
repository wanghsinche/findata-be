const domain = 'https://findata-be.uk'
function getEmail(){
  return process.env.NODE_ENV === 'test'? 'wang0xinzhe@gmail.com':Session.getActiveUser().getEmail();
}

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
  return d instanceof Date && !isNaN(d) && d.toISOString()===str; // valid date 
}

function convertDate(k, value){
  if (typeof value === 'string' && isIsoDate(value)){
    return new Date(value)
  }
  return value
}

function getFromCacheOrServer(quoteURL){
  const key = String(hashFunc(quoteURL))
  let quoteRes = '';
  const cache = CacheService.getScriptCache();
  if (cache.get(key)){
    quoteRes = cache.get(key)
  } else {
    quoteRes = UrlFetchApp.fetch(quoteURL).getContentText();
    cache.put(key, quoteRes, expirationInSeconds)
  }
  return quoteRes
}


const expirationInSeconds = 300

/**
 * generate ticker data
 * @param {String} ticker stock ticker
 */
function generateQuote(ticker) {
  const email = getEmail();

  const quoteURL = `${domain}/api/quote?ticker=${ticker}&email=${email}`;
  
  const quoteRes = getFromCacheOrServer(quoteURL);

  const quoteJSON = JSON.parse(quoteRes);
  return quoteJSON.sheetData;
}


/**
 * generate ticker statement
 * @param {String} ticker stock ticker
 * @param {String} sheet balance annually, cash annually, income annually, balance quaterly, cash quaterly, income quaterly
 */
function generateStatement(ticker, sheetType) {
  const email = getEmail();

  const quoteURL = `${domain}/api/statement?ticker=${ticker}&sheet=${sheetType}&email=${email}`;


  const quoteRes = getFromCacheOrServer(quoteURL);

  const quoteJSON = JSON.parse(quoteRes);

  return quoteJSON.sheetData

}

/**
 * get plan detail
 *
 */
function getPlanDetail() {
  const email = getEmail();
  const verifyURL = `${domain}/api/verify?email=${email}`;
  
  const planRes = UrlFetchApp.fetch(verifyURL).getContentText();

  const planResJSON = JSON.parse(planRes);

  return {
    plan: planResJSON.plan,
    email,
    expiration: planResJSON.expiration
  }
}

/**
 * getYahooFinance
 * @param {string} moduleName 
 * @param {string} query 
 * @param {object} [queryOptions] 
 * @param {string} [path] 
 * @return 2d array
 */
function getYahooFinance(moduleName, query, queryOptions, path){
  const email = getEmail();
  const body = {
    moduleName, query, queryOptions, path
  }
  const yhURL = `${domain}/api/yahoo-finance?email=${email}&json=${encodeURIComponent(JSON.stringify(body))}`;

  const dataRes = getFromCacheOrServer(yhURL)

  const dataJSON = JSON.parse(dataRes, convertDate);

  return dataJSON.sheetData
}