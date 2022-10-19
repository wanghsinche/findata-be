import { productName } from "../utils/constant";
import { MyLogo } from "./logo";

export function MyFoot() {
  return <footer className="bg-gray-800 " id="footer">
    <div className="container mx-auto mt-8 px-8">
      <div className="w-full flex flex-col md:flex-row py-6">
        <div className="flex-1 mb-6">
          <MyLogo color="text-white" />
        </div>

        <div className="flex-1">
          <p className="uppercase font-extrabold text-gray-200 md:mb-6">Links</p>
          <ul className="list-reset mb-6">
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <a href="/privacy" className="font-light no-underline hover:underline text-gray-100 hover:text-orange-500">Privacy Policy</a>
            </li>
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <a href="/term" className="font-light no-underline hover:underline text-gray-100 hover:text-orange-500">Terms & Conditions</a>
            </li>

            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <a href="mailto:wang0xinzhe@gmail.com?subject=FinData%20FAQ" className="font-light no-underline hover:underline text-gray-100 hover:text-orange-500">FAQ</a>
            </li>
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <a href="/support" className="font-light no-underline hover:underline text-gray-100 hover:text-orange-500">Support</a>
            </li>
          </ul>
        </div>

        <div className="flex-1">
          <p className="uppercase font-extrabold text-gray-200 md:mb-6">Powered By</p>
          <ul className="list-reset mb-6">
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <span className="font-light no-underline text-gray-100 hover:text-orange-500">
                <img src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent('npmjs.com')}&sz=${16}`} width={16} height={16} style={{display:'inline-block'}} /> node-yahoo-finance2</span>
            </li>
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <span className="font-light no-underline text-gray-100 hover:text-orange-500">
                <img src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent('app.supabase.com')}&sz=${16}`} width={16} height={16} style={{display:'inline-block'}} /> supabase.com</span>
            </li>
            <li className="mt-2 inline-block mr-2 md:block md:mr-0">
              <span className="font-light no-underline text-gray-100 hover:text-orange-500">
                <img src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent('vercel.com')}&sz=${16}`} width={16} height={16} style={{display:'inline-block'}} /> vercel.com</span>
            </li>
          </ul>
        </div>



      </div>
    </div>
  </footer>
}