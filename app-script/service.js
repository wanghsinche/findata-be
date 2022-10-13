/**
 * generate ticker data
 * @param {String} ticker stock ticker
 */
function generateQuote(ticker) {
  const email = Session.getActiveUser().getEmail();

  const quoteURL = `https://findata-be.vercel.app/api/quote?ticker=${ticker}&email=${email}`;

  const quoteRes = UrlFetchApp.fetch(quoteURL).getContentText();

  const quoteJSON = JSON.parse(quoteRes);
  return quoteJSON.sheetData;
}


/**
 * generate ticker statement
 * @param {String} ticker stock ticker
 * @param {String} sheet balance annually, cash annually, income annually, balance quaterly, cash quaterly, income quaterly
 */
function generateStatement(ticker, sheetType) {
  const email = Session.getActiveUser().getEmail();

  const quoteURL = `https://findata-be.vercel.app/api/statement?ticker=${ticker}&sheet=${sheetType}&email=${email}`;


  const quoteRes = UrlFetchApp.fetch(quoteURL).getContentText();

  const quoteJSON = JSON.parse(quoteRes);

  return quoteJSON.sheetData

}

/**
 * get plan detail
 *
 */
function getPlanDetail() {
  const email = Session.getActiveUser().getEmail();
  const verifyURL = `https://findata-be.vercel.app/api/verify?email=${email}`;
  
  const planRes = UrlFetchApp.fetch(verifyURL).getContentText();

  const planResJSON = JSON.parse(planRes);

  return {
    plan: planResJSON.plan,
    email,
    expiration: planResJSON.expiration
  }
}