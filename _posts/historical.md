# historical module

API for e.g. https://finance.yahoo.com/quote/TSLA/history?p=TSLA.

Note: the historical API is used for querying time series data;


## Usage:

### Basic Usage

```bash
=FinData("historical", "TSLA", {"period1","2022-02-22";"period2","2022-11-11"})

```
### Result 

| date	  | open   | high	   | low 	   |    close  |  adjClose |   volume          |
| --------| ------ | ----------| --------- | --------- | --------- | ----------------- |
|2/22/2022|	$278.04|	$285.58|	$267.03|	$273.84|	$273.84|	$83,288,100.00 |
|2/23/2022|	$276.81|	$278.43|	$253.52|	$254.68|	$254.68|	$95,256,900.00 |
|2/24/2022|	$233.46|	$267.49|	$233.33|	$266.92|	$266.92|	$135,322,200.00|
|2/25/2022|	$269.74|	$273.17|	$260.80|	$269.96|	$269.96|	$76,067,700.00 |


**Note:** The example output above does not cover all possible return results, which can vary by asset type and even time of day (trading period). 

### Query Options

| Name          | Type      | Default    | Description                       |
| ------------- | ----------| ---------- | --------------------------------- |
| `period1`     | Date*     | *required* | Starting period
| `period2`     | Date*     | (today)    | Ending period
| `interval`    | "1d", "1wk", "1mo" | "1d" | Interval (day, week, month)
| `events`      | string    | "history"
| `includeAdjustedClose` | boolean | true

### Path Option

None. `historical` Module doesn't support `Path` Option.

### Column Option

`date`,`open`,`high`,`low`,`close`,`adjClose`,`volume`

You may select the specific column(s) from origin data.

```bash
=FinData("historical", "TSLA", {"period1","2022-02-22";"period2","2022-11-11"},,"date,open")

```

### Result

| date	  | open   | 
| --------| ------ |
|2/22/2022|	$278.04|
|2/23/2022|	$276.81|
|2/24/2022|	$233.46|
|2/25/2022|	$269.74|

