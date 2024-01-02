import '@/styles/globals.css'
import {ThemeProvider} from 'next-themes'
import Navbar from "@/components/Navbar";

export default function App({Component, pageProps}) {
    return (
        <div className={'p-4 md:p-0 max-w-[1216px] w-full m-auto'}>
            <ThemeProvider attribute="class" defaultTheme='system'>
                <Navbar/>
                <Component {...pageProps} />
            </ThemeProvider>
        </div>
    )
}
