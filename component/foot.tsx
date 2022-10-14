import { productName } from "../utils/constant";
import { MyLogo } from "./logo";

export function MyFoot(){
    return <footer className="bg-white ">
    <div className="container mx-auto mt-8 px-8">
      <div className="w-full flex flex-col md:flex-row py-6">
        <div className="flex-1 mb-6">
          <MyLogo />
        </div>

        <div className="flex-1">
          <p className="uppercase font-extrabold text-gray-500 md:mb-6">Links</p>
          <ul className="list-reset mb-6">
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <a href="#" className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500">FAQ</a>
            </li>
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <a href="#" className="font-light no-underline hover:underline text-gray-800 hover:text-orange-500">Support</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
}