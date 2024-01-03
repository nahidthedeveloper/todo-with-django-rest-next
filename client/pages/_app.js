import '@/styles/globals.css'
import {ThemeProvider} from 'next-themes'
import Navbar from "@/components/Navbar";
import {SessionProvider} from "next-auth/react";

export default function App({Component, pageProps: {session, ...pageProps},}) {
    return (
        <div className={'p-4 md:p-0 max-w-[1216px] w-full m-auto'}>
            <ThemeProvider attribute="class" defaultTheme='system'>
                <SessionProvider session={session}>
                    <Navbar/>
                    <Component {...pageProps} />
                </SessionProvider>
            </ThemeProvider>
        </div>
    )
}
