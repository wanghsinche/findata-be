/* ------------------- Main function -------------------- */

const appName = 'FinData'


function onGetPlanDetail() {
  return getPlanDetail()
}

function onInsertFormula(info){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];

  const cell = sheet.getCurrentCell();
  if (!cell) {
    throw('Unable to insert text, no cursor.');
  }

  cell.setValue(`=FinData("${info.moduleName}", "${info.ticker}", ${recordToTwoDArrayString(info.queryOption)}, "${info.path}", "${info.column}")`)

}

/* ----------- Google Sheets add-on functions ----------- */

/**
 * onOpen
 * @param {*} e open event
 */
function onOpen(e) {
  
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem(`Open ${appName} Formula Builder`, 'showbuilder')
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

function showbuilder() {
  const ui = HtmlService.createHtmlOutputFromFile('formula-builder')
    .setTitle(`${appName} - Formula Builder`);
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


