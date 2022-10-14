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

  const rowStart = cell.getLastRow()+1
  const colStart = cell.getLastColumn()

  const cols = data[0].length
  const rows = data.length

  const targetRange = sheet.getRange(rowStart, colStart, rows, cols);

  targetRange.setValues(data);

  const bold = SpreadsheetApp.newTextStyle()
  .setBold(true)
  .build();

  sheet.getRange(rowStart, colStart, 1, cols).setTextStyles([new Array(cols).fill(bold)])

  sheet.getRange(rowStart-1, colStart, 1, 2).setValues([['TICKER:',ticker]]).setTextStyles([[bold, bold]])

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
  
  const rowStart = cell.getLastRow()+1
  const colStart = cell.getLastColumn()

  const data = generateStatement(ticker, sheetType)

  const cols = data[0].length
  const rows = data.length

  const targetRange = sheet.getRange(rowStart, colStart, rows, cols);

  targetRange.setValues(data);

  const bold = SpreadsheetApp.newTextStyle()
  .setBold(true)
  .build();

  sheet.getRange(rowStart, colStart, 1, cols).setTextStyles([new Array(cols).fill(bold)])

  sheet.getRange(rowStart-1, colStart, 1, 2).setValues([['TICKER:',ticker]]).setTextStyles([[bold, bold]])

  return 
}

function onGetPlanDetail() {
  return getPlanDetail()
}

/* ----------- Google Sheets add-on functions ----------- */

/**
 * onOpen
 * @param {*} e open event
 */
function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem(`${appName} Pannel`, 'showPannel')
    .addSeparator()
    .addItem(`My Account`, 'showAccount')
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
    .setTitle(`${appName} - Pannel`);
  SpreadsheetApp.getUi().showSidebar(ui);
}

/**
 * show premium
 */

 function showAccount(){
  const ui = HtmlService.createHtmlOutputFromFile('account')
  .setTitle(`${appName} - My Account`);
  SpreadsheetApp.getUi().showDialog(ui)
}
