/* ------------------- Main function -------------------- */

/**
 * generate ticker data
 * @param {String} ticker stock ticker
 */
function onGenerateQuote(ticker) {
  const quoteURL = 'https://findata-be.vercel.app/api/quote?ticker=' + ticker;


  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];

  const cell = sheet.getCurrentCell();
  if (!cell) {
    throw('Unable to insert text, no cursor.');
  }
  
  const rowStart = cell.getLastRow()
  const colStart = cell.getLastColumn()+1

  const quoteRes =  UrlFetchApp.fetch(quoteURL).getContentText();

  const quoteJSON = JSON.parse(quoteRes);

  const cols = quoteJSON.sheetData[0].length
  const rows = quoteJSON.sheetData.length

  const targetRange = sheet.getRange(rowStart, colStart, rows, cols);

  targetRange.setValues(quoteJSON.sheetData);

  cell.setValue(ticker)

  return 
}

/**
 * generate ticker statement
 * @param {String} ticker stock ticker
 * @param {String} sheet balance annually, cash annually, income annually, balance quaterly, cash quaterly, income quaterly
 */
function onGenerateStatement(ticker, sheetType) {
  const quoteURL = `https://findata-be.vercel.app/api/statement?ticker=${ticker}&sheet=${sheetType}`;


  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];

  const cell = sheet.getCurrentCell();
  if (!cell) {
    throw('Unable to insert text, no cursor.');
  }
  
  const rowStart = cell.getLastRow()
  const colStart = cell.getLastColumn()+1

  const quoteRes =  UrlFetchApp.fetch(quoteURL).getContentText();

  const quoteJSON = JSON.parse(quoteRes);

  const cols = quoteJSON.sheetData[0].length
  const rows = quoteJSON.sheetData.length

  const targetRange = sheet.getRange(rowStart, colStart, rows, cols);

  targetRange.setValues(quoteJSON.sheetData);

  cell.setValue(ticker)

  return 
}


/* ----------- Google Sheets add-on functions ----------- */
/**
 * onOpen
 * @param {*} e open event
 */
function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Show Pannel', 'showAbout')
    .addToUi();
}

/**
 * onInstall
 * @param {*} e install event
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * callback function
 */
function showAbout() {
  const ui = HtmlService.createHtmlOutputFromFile('pannel')
    .setTitle('dFin Pannel');
  SpreadsheetApp.getUi().showSidebar(ui);
}
