import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
                <script>
                {`tailwind.config = {
                    darkMode: 'class',
                }`}
                </script>
            </Head>
            <body className='leading-relaxed tracking-wide flex flex-col'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
