/* ------------------- Main function -------------------- */

const appName = 'FinData'

/**
 * generate ticker data
 * @param {String} ticker stock ticker
 */
function onGenerateQuote(ticker) {


  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];

  const cell = sheet.getCurrentCell();
  if (!cell) {
    throw('Unable to insert text, no cursor.');
  }

  const data = generateQuote(ticker)

  const rowStart = cell.getLastRow()
  const colStart = cell.getLastColumn()+1

  const cols = data[0].length
  const rows = data.length

  const targetRange = sheet.getRange(rowStart, colStart, rows, cols);

  targetRange.setValues(data);

  cell.setValue(ticker)

  return 
}

/**
 * generate ticker statement
 * @param {String} ticker stock ticker
 * @param {String} sheet balance annually, cash annually, income annually, balance quaterly, cash quaterly, income quaterly
 */
function onGenerateStatement(ticker, sheetType) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];

  const cell = sheet.getCurrentCell();
  if (!cell) {
    throw('Unable to insert text, no cursor.');
  }
  
  const rowStart = cell.getLastRow()
  const colStart = cell.getLastColumn()+1

  const data = generateStatement(ticker, sheetType)

  const cols = data[0].length
  const rows = data.length

  const targetRange = sheet.getRange(rowStart, colStart, rows, cols);

  targetRange.setValues(data);

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
    .addItem(`${appName} Pannel`, 'showPannel')
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
function showPannel() {
  const ui = HtmlService.createHtmlOutputFromFile('pannel')
    .setTitle(`${appName} Pannel`);
  SpreadsheetApp.getUi().showSidebar(ui);
}
