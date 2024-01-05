'use client'
import React, { useContext, useEffect, useState } from 'react';
import Head from "next/head";
import { httpClient } from '@/utils/api';
import { TokenContext } from '@/context/tokenContext';

const Index = () => {
    const tokenStatus = useContext(TokenContext)

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (tokenStatus === 'added') {
            httpClient.get('/profile/')
                .then(res => {
                    setUser(res.data[0]);
                }).catch(err => {
                    console.log(err);
                })
        }
    }, [tokenStatus])

    return (
        <>
            <Head>
                <title>Todo | Profile</title>
            </Head>
            <div className='w-full flex justify-center'>
                {user && (
                    <div>
                        <p>Hi, {user.email}</p>
                        <p>You join this todo app at - {user.date_joined}</p>
                        <p>You are last login at - {user.last_login}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Index;