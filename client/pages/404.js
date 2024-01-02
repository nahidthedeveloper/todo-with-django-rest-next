import React from "react";
import Link from "next/link";
import Head from "next/head";

const NotFound = () => {
    return (
        <>
            <Head>
                <title>Todo | 404 Not Found</title>
            </Head>

            <div>
                <h1 className={'text-3xl font-bold text-red-600'}>Page not found :)</h1>
                <Link href={'/'}
                      className={'text-xl bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'}>Goto
                    Home</Link>
            </div>
        </>
    );
};

export default NotFound;