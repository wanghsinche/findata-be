import { productName } from "../utils/constant";
import { MyLogo } from "./logo";

export function MyBanner(){
    return <div className="px-3 lg:px-0">
    <h1 className="my-4 text-2xl md:text-3xl lg:text-5xl font-black leading-tight">
        <MyLogo />
    </h1>
    <p className="leading-normal text-base mb-8 text-left md:w-full lg:w-1/2 mx-auto">
    Powered by Yahoo Finance, FinData enables you to import all market stocks, ETFs, cryptocurrencies and finance statement to your spreadsheet.
    </p>
  </div>
}