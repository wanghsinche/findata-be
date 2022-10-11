export interface IFinvizQuote {
  ticker: string
  timeframe: string
  volume: number[]
  date: number[]
  open: number[]
  high: number[]
  low: number[]
  close: number[]
  lastOpen: number
  lastHigh: number
  lastLow: number
  lastClose: number
  lastVolume: number
  dataId: number
  lastDate: number
  prevClose: number
  afterClose: any
  afterChange: any
  patterns: Pattern[]
  patternsMinRange: number
  patternsMaxRange: number
}

export interface Pattern {
  kind: number
  strength: number
  status: number
  bounces: number
  x1: number
  y1: number
  x2: number
  y2: number
  x3: number
  y3: number
  x4: number
  y4: number
  ticker: string
}

export interface IFinvizStatement {
  currency: string
  data: Data
}

export interface Data {
  "Period End Date": string[]
  "Period Length": string[]
  "Total Revenue": string[]
  "Cost of Revenue": string[]
  "Gross Profit": string[]
  "Selling, General and Administrative": string[]
  "Research and Development": string[]
  "Unusual Expense/Income": string[]
  "Total Operating Expense": string[]
  "Operating Income": string[]
  "Interest Income Net": string[]
  "Other Income Net": string[]
  "Net Income Before Taxes": string[]
  "Provision for Income Taxes": string[]
  "Net Income": string[]
  "Income Avail. to Common Excl. Extraord.": string[]
  "Income Avail. to Common Incl. Extraord.": string[]
  "Diluted Average Shares": string[]
  "Diluted EPS Excl. Extraord.": string[]
  "Diluted EPS Incl. Extraord.": string[]
}

export enum EStatement {
  incomeStatement='IA',
  balanceSheet='BA',
  cashFlow='CA'	
}