'use client'
import React from 'react';
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import {useRouter} from "next/router";
import {signOut, useSession} from "next-auth/react";
import ProfileOption from "@/components/ProfileOption";

const Navbar = () => {
    const router = useRouter()
    const {data: session, status} = useSession()

    const active = "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
    const normal = "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    const navData = [
        {
            "url": "/",
            "name": "Home"
        },
        {
            "url": "/about",
            "name": "About"
        },
        {
            "url": "/contact",
            "name": "Contact"
        },
    ]

    return (
        <nav className="border-gray-200 my-6">
            <div className="flex flex-wrap items-center justify-between">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse text-2xl">
                    Todo App
                </Link>
                <button data-collapse-toggle="navbar-default" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 17 14">
                        <path stroke="currentColor"
                              d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    {status !== 'loading' &&
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {navData.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        className={`${router.pathname === item.url ? active : normal}`}
                                        href={item.url}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            {status === 'authenticated' && (
                                <li>
                                    <Link
                                        className={`${router.pathname === '/todos' ? active : normal}`}
                                        href='/todos'
                                    >
                                        Todo
                                    </Link>
                                </li>
                            )}
                            <li className='mb-5 md:mb-0'>
                                <ThemeToggle/>
                            </li>


                            {status === 'authenticated' && (
                                <li>
                                    <ProfileOption user={session?.user.email}/>
                                </li>
                            )}
                            {status === 'unauthenticated' && (
                                <li>
                                    <Link
                                        className="mt-4 md:mt-0 px-3 py-2 text-white dark:text-black leading-loose text-xs text-center font-semibold leading-none bg-black dark:bg-gray-50 dark:hover:bg-gray-100 rounded-xl"
                                        href="/signup">Signup</Link>
                                </li>
                            )}
                            {status === 'unauthenticated' && (
                                <li>
                                    <Link
                                        className="mt-4 md:mt-0 px-3 py-2 text-white dark:text-black leading-loose text-xs text-center font-semibold leading-none bg-black dark:bg-gray-50 dark:hover:bg-gray-100 rounded-xl"
                                        href="/login">Login</Link>
                                </li>
                            )}
                        </ul>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;