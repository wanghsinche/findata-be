# quoteSummary module

Get quote details

## Usage:
### Basic Usage

```bash
=FinData("quoteSummary", "AAPL", {"modules","price"}, "price.regularMarketPrice")
```
### Result
138.38

**Note:** The example output above does not cover all possible return results, which can vary by asset type and even time of day (trading period). 

### Symbol

Symbol name as used by Yahoo (often the stock ticker).  

### Query Options

| Name          | Type      | Default    | Description                       |
| ------------- | ----------| ---------- | --------------------------------- |
| `modules`     | `Array<string>`  | `["price","summaryDetail"]` | List of modules to query

*As there're multiple sub modules, it is strongly suggested to use the Formula builder to automatically generate the formula.*

The full list of submodules:

* [assetProfile](#assetProfile)
* [balanceSheetHistory](#balanceSheetHistory)
* [balanceSheetHistoryQuarterly](#balanceSheetHistoryQuarterly)
* [calendarEvents](#calendarEvents)
* [cashflowStatementHistory](#cashflowStatementHistory)
* [cashflowStatementHistoryQuarterly](#cashflowStatementHistoryQuarterly)
* [defaultKeyStatistics](#defaultKeyStatistics)
* [earnings](#earnings)
* [earningsHistory](#earningsHistory)
* [earningsTrend](#earningsTrend)
* [financialData](#financialData)
* [fundOwnership](#fundOwnership)
* [fundPerformance](#fundPerformance)
* [fundProfile](#fundProfile)
* [incomeStatementHistory](#incomeStatementHistory)
* [incomeStatementHistoryQuarterly](#incomeStatementHistoryQuarterly)
* [indexTrend](#indexTrend)
* [industryTrend](#industryTrend)
* [insiderHolders](#insiderHolders)
* [insiderTransactions](#insiderTransactions)
* [institutionOwnership](#institutionOwnership)
* [majorDirectHolders](#majorDirectHolders)
* [majorHoldersBreakdown](#majorHoldersBreakdown)
* [netSharePurchaseActivity](#netSharePurchaseActivity)
* [price](#price)
* [quoteType](#quoteType)
* [recommendationTrend](#recommendationTrend)
* [secFilings](#secFilings)
* [sectorTrend](#sectorTrend)
* [summaryDetail](#summaryDetail)
* [summaryProfile](#summaryProfile)
* [symbol](#symbol)
* [topHoldings](#topHoldings)
* [upgradeDowngradeHistory](#upgradeDowngradeHistory)
