import type { NextPage } from 'next'
import { productName, email } from '../utils/constant'


function Policy() {
    return <div className="container">
        <h1 className='font-bold text-lg text-center'>Privacy Policy</h1>
        <p dir="ltr" className="my-4">Our code can only access your data while you’re accessing the add-on. We don’t sync your data to our own servers and we don’t have any direct access to your data.</p>
        <p dir="ltr" className="my-4">We use Google’s Property Service which allows us to attach limited data (such as saved API requests) to the spreadsheet itself and to the user, on Google’s servers. We then use Google Apps Script which runs exclusively on Google servers.</p>
        <p dir="ltr" className="my-4">The only data that syncs to our servers is the data entered and sent to Stripe (our payment processor) during the subscription process. There is also analytics data that uses a unique identifier for you and tracks app usage such as running API requests. We do not log any data about the API you call, or the parameters you selected.</p>
        <p dir="ltr" className="my-4">We do not have access to view any of the information stored in your Sheets nor any of your saved API information.</p>
        <p dir="ltr" className="my-4">An example of the data collected is that a user made 40 API requests this month (with no further details beyond when each request was triggered). This limited data is collected so that we can better understand feature usage and cater further development to user needs.</p>
        <p dir="ltr" className="my-4">Every app that Google approves must go through a strict security &amp; privacy approval process, including ours. Google’s Cloud Platform/API Trust &amp; Safety Team has approved the {productName} add-on for the 3 following “scopes”, which you can see on the OAuth screen in the screenshot above:</p>
        <ul className='ml-4'>
            <li dir="ltr" className="list-disc">1. See, edit, create, and delete your spreadsheets in Google Drive – Scope: https://www.googleapis.com/auth/spreadsheets. This permission allows the add-on to manipulate the spreadsheet to be able to insert the API data.</li>
            <li dir="ltr" className="list-disc">2. Connect to an external service – Scope: https://www.googleapis.com/auth/script.external_request. This permission is necessary for the add-on to be able to make API calls to external applications.</li>
            <li dir="ltr" className="list-disc">3. Display and run third-party web content in prompts and sidebars inside Google applications – Scope: https://www.googleapis.com/auth/script.container.ui. This permission allows the add-on to be inserted into the menu of Google Sheets so you can open the add-on in a sidebar and make API requests.</li>
        </ul>
        <p dir="ltr" className="my-4">When you install and open the add-on for the first time, Google will ask you to allow access for the 3 permissions listed above.</p>
        <p dir="ltr" className="my-4">We do not have access to view any of the information stored in your Sheets or any of your saved API information. All of your spreadsheet/API information is stored by Google and we don’t have access to it.</p>
        <p dir="ltr" className="my-4">None of your API or spreadsheets information is synced to our servers.</p>
        <p dir="ltr" className="my-4">Your saved API requests get deleted when you uninstall the add-on.</p>
        <p dir="ltr" className="my-4">Your payments and credit card information is stored by Stripe.</p>
        <p dir="ltr" className="my-4">We also store your email address when you install the app for email marketing purposes.</p>
    </div>
}

function InfoLog() {
    return <div className='container'>
        <h1 className='font-bold text-lg text-center'>Information Collected and Used</h1>
        <div className="my-4">
            <p dir="ltr" className="my-4">Here you will find information describing the data collected by our website (the “Website”) and via our Google Sheets add-on {productName} (the “Add-on”), here in after called the “Service”.</p>
            <p dir="ltr" className="my-4">This Privacy Statement governs personal information we collects from customers, users and online visitors (“you” or “your”) in connection with your use of the Service, applications and services (including support and education), where we post or link to this Privacy Statement, as well as information we automatically collect from your online visits (e.g. data collected via cookies). For the purposes of this Privacy Statement, “personal information” means any information that, by itself, can identify you or can be combined with other information to identify you.</p>
            <p dir="ltr" className="my-4">As a general code of conduct, we always try our best to minimize the amount of information we need to collect and use, while still providing you with the highest level of Service.</p>
        </div>

        <h2 className='font-bold text-md'>Log data</h2>

        <p className="my-4">
            Each access to our Website generates logs data that includes, but may not be limited to: your IP address, your web browser user-agent, the language preferences of your web browser, the date and time of your visits.

            Each access to our Add-on generates logs data that includes an anonymous and temporary number that Google Sheets generates. As each call to your API is anonymous, in order to count the number of unique API calls we receive, we also make a hash of your sheet locale, id and timezone.

            We may use your personal information for legitimate business purposes, including: to provide and deliver the Services you request; send you transaction information; including confirmations and transaction status; product and services information, updates, security alerts and support and administrative messages; administer your account, including verifying your information; respond to your comments and questions and provide customer support or other services; offer Live Chat assistance to facilitate; operate and improve our websites, products and services; provide you with information about products and services; perform other functions or serve other purposes, as disclosed to you at the point of collection, or as otherwise required or allowed under applicable law.
        </p>

        <h2 className='font-bold text-md'>Billing data</h2>

        <p className="my-4">
            We collect your credit card information when your subscribe and pay to access to some part of the Service.

            We never store your credit card information. All payment and billing operation and services are processed by Stripe. Stripe allows us to see when invoices are due, processing or paid, or any other status.

        </p>

        <h2 className='font-bold text-md'>Cookies</h2>

        <p className="my-4">
            We use Google Analytics on our Website. Our website and add-on uses cookies to collect statistics on your visits and interactions on our Website or Add-on, which includes cookies required for our affiliate program.</p>

        <h2 className='font-bold text-md'>Service Providers</h2>

        <p className="my-4">
            We may employ third-party companies and individuals due to the following reasons: to facilitate our Service; to provide the Service on our behalf; to perform Service-related services; or to assist us in analyzing how our Service is used.  An example of a third-party service provider we use is SendGrid for email marketing.
        </p>
        <h2 className='font-bold text-md'>Security</h2>
        <p className="my-4">The protection of your data is important to us. We are striving to use, to the best of our knowledge, available means of protection. However, please be aware that no method of transmission over the internet, or method of electronic storage is 100% secure or reliable, and we cannot guarantee the absolute security of the Service.</p>
        <h2 className='font-bold text-md'>
            Data Sharing
        </h2>
        <p className="my-4">We will share the data we collected about you for any legal obligations and rights. We may disclose your personal information in these circumstances: In connection with the establishment, exercise or defense of legal claims; to comply with laws or to respond to lawful requests or legal process; for fraud or security monitoring purposes (e.g., to detect and prevent cyberattacks); to protect our rights or our employees rights; or as otherwise permitted by applicable law.
        </p>
        <h2 className='font-bold text-md'>
            Retention of Data
        </h2>
        <p className="my-4">We may retain your personal information data as long as is necessary to fulfill the purposes for which it was collected and in accordance with applicable law.
        </p>
        <h2 className='font-bold text-md'>
            Deletion of Data
        </h2>
        <p className="my-4">
            Your data that is stored by the add-on is deleted automatically upon uninstallation of the add-on.
        </p>
        <h2 className='font-bold text-md'>
            Children’s Privacy
        </h2>
        <p className="my-4">
            The Service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us at {email} so that we will be able to do necessary actions.
        </p>
        <h2 className='font-bold text-md'>
            Changes to this Privacy Statement
        </h2>
        <p className="my-4">
            We may update our Privacy statement from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Statement on this page. These changes are effective immediately after they are posted on this page. If we make any changes to this Privacy Statement, we will change the “Last Updated” date at the beginning of this Privacy Statement.
        </p>
    </div>
}

function Contact(){
    return <div className='container my-8'>
        <h1 className='font-bold text-lg text-center'>Contact</h1>
        <p className="my-4">
        If you have any questions, concerns or comments about this Privacy Statement or our privacy practices, please contact us via email at {email}
        </p>
    </div>
}

const Page: NextPage = () => {

    return (
        <div className='m-auto' >
            <div className='w-2/3 m-auto bg-white p-10'>
                <Policy />
                <InfoLog />
                <Contact />
            </div>
        </div>
    )
}

export default Page
