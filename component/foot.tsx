import { productName } from "../utils/constant";
import { MyLogo } from "./logo";

export function MyFoot(){
    return <footer className="bg-black " id="footer">
    <div className="container mx-auto mt-8 px-8">
      <div className="w-full flex flex-col md:flex-row py-6">
        <div className="flex-1 mb-6">
          <MyLogo color="text-white"/>
        </div>

        <div className="flex-1">
          <p className="uppercase font-extrabold text-gray-200 md:mb-6">Links</p>
          <ul className="list-reset mb-6">
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <a href="/privacy" className="font-light no-underline hover:underline text-gray-100 hover:text-orange-500">Privacy Policy</a>
            </li>
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <a href="mailto:wang0xinzhe@gmail.com?subject=FinData%20FAQ" className="font-light no-underline hover:underline text-gray-100 hover:text-orange-500">FAQ</a>
            </li>
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <a href="mailto:wang0xinzhe@gmail.com?subject=FinData%20support" className="font-light no-underline hover:underline text-gray-100 hover:text-orange-500">Support</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
}