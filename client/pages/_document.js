import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class SpecialDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css"
                        rel="stylesheet"
                    />
                </Head>

                <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
                    <Main />
                    <NextScript />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>
                </body>
            </Html>
        )
    }
}

export default SpecialDocument
