import type { NextPage } from 'next'
import { productName, email } from '../utils/constant'

const Page = () => {
    return <div className='m-auto my-bg-image' >
    <div className='md:w-full break-all lg:w-2/3 m-auto bg-white p-10'>
        <h1 className='font-bold text-lg text-center mb-4'>Support</h1>
        <p>
            If you experience an issue with the {productName} add-on, for example the add-on doesn&quot;t work correctly, it is a blank white screen, or there is a payment/account issue, it could be because you&quot;re signed in to multiple Google accounts. This is a known issue with Google Accounts and Google Apps. To fix the issue, sign out of your other Google accounts in your browser, or sign in to 1 Google account in a different browser, then try again.
        </p>
        <br />
        <p>
            Need additional help? 
        </p>
        <p>
        Fill the form <a href='https://forms.gle/gp8KYghdD93kSzq48' target="_blank" rel="noreferrer">https://forms.gle/gp8KYghdD93kSzq48</a>
        </p>

    </div>
    </div>
}

export default Page;