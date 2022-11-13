import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    const conf = `
    tailwind.config = {
        darkMode:'class'
      }  
    `
    return (
        <Html>
            <Head>
                <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
                <script dangerouslySetInnerHTML={{__html:conf}}/>
            </Head>
            <body className='leading-relaxed tracking-wide flex flex-col'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
