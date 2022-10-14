import { Html, Head, Main, NextScript } from 'next/document'
import { MyFoot } from '../component/foot'
import { MyHead } from '../component/head'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" />
                <link
                    href="https://unpkg.com/@tailwindcss/custom-forms/dist/custom-forms.min.css"
                    rel="stylesheet"
                />
            </Head>
            <body className='leading-relaxed tracking-wide flex flex-col'>
                <MyHead />
                <Main />
                <MyFoot />
                <NextScript />
            </body>
        </Html>
    )
}
