import { productName } from "../utils/constant";
import { MyLogo } from "./logo";

export function MyBanner(){
    return <div className="px-3 lg:px-0">
    <h1 className="my-4 text-2xl md:text-3xl lg:text-5xl font-black leading-tight">
        <MyLogo />
    </h1>
    <p className="leading-normal text-base mb-8 text-left md:w-full lg:w-1/2 mx-auto">
    FinData enables you to import all market stocks, ETFs, cryptocurrencies and finance statement sheet to your spreadsheet by using a simple operation. Combined with the Google Sheet, you will be able to analyze the stock market in a single spreadsheet.
    </p>
  </div>
}