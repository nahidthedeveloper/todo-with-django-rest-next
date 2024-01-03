'use client'
import React from 'react';
import Head from "next/head";
import {useSession} from "next-auth/react";

const Index = () => {
    const session = useSession()

    console.log(session)
    return (
        <>
            <Head>
                <title>Todo | Profile</title>
            </Head>

            <div>

                this is profile page
            </div>
        </>
    );
};

export default Index;