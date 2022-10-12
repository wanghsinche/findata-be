/**
 * generate ticker data
 * @param {String} ticker stock ticker
 */
 function generateQuote(ticker) {
    const quoteURL = 'https://findata-be.vercel.app/api/quote?ticker=' + ticker;
    
    const quoteRes =  UrlFetchApp.fetch(quoteURL).getContentText();
  
    const quoteJSON = JSON.parse(quoteRes);
    return quoteJSON.sheetData;  
  }
  

/**
 * generate ticker statement
 * @param {String} ticker stock ticker
 * @param {String} sheet balance annually, cash annually, income annually, balance quaterly, cash quaterly, income quaterly
 */
 function generateStatement(ticker, sheetType) {
    const quoteURL = `https://findata-be.vercel.app/api/statement?ticker=${ticker}&sheet=${sheetType}`;
  
  
    const quoteRes =  UrlFetchApp.fetch(quoteURL).getContentText();
  
    const quoteJSON = JSON.parse(quoteRes);
  
    return quoteJSON.sheetData
  
  }
  