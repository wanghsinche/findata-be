const domain = 'https://findata-be.uk'

function getEmail() {
  return process.env.NODE_ENV === 'test' ? 'wang0xinzhe@gmail.com' : Session.getActiveUser().getEmail();
}

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

  // update the local state
  isFree = Number(res.expiration) < Date.now()

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
 * @param {string} [expand]
 * @param {string} [columns] 
 * @return 2d array
 */
function getYahooFinance(moduleName, query, queryOptions={}, expand="*", columns="") {
  const email = getEmail();
  const body = {
    moduleName, 
    query, 
    queryOptions, 
    expand,
    columns
  }
  const yhURL = `${domain}/api/yahoo-finance?email=${email}&json=${encodeURIComponent(JSON.stringify(body))}`;
  
  const dataRes = getFromCacheOrServer(yhURL)

  const dataJSON = JSON.parse(dataRes, convertDate);

  return dataJSON.sheetData
}