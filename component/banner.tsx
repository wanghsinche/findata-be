import { productName } from "../utils/constant";
import { MyLogo } from "./logo";

export function MyBanner(){
    return <div className="text-center px-3 lg:px-0">
    <h1 className="my-4 text-2xl md:text-3xl lg:text-5xl font-black leading-tight">
        <MyLogo color="text-white"/>
    </h1>
    <p className="leading-normal text-base md:text-xl lg:text-2xl mb-8 text-gray-800">
      Retrieve finance data into your Google Sheet
    </p>
  </div>
}