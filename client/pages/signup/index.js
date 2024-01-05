'use client'
import React from 'react';
import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import axios from "axios";
import { objectToArray } from "@/utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSession } from "next-auth/react";
import { httpClient } from '@/utils/api';
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
        reset
    } = useForm({
        mode: "onTouched"
    })

    const SignupForm = (signupData) => {
        httpClient.post(`/signup/`, { ...signupData })
            .then((response) => {
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                reset()

            }).catch(err => {
                const { data } = err.response
                if (data) {
                    // TODO -> HANDLE NON FIELD ERRORS
                    const formattedData = objectToArray(data)
                    formattedData.map(el => {
                        setError(el.name, {
                            type: 'custom',
                            message: el.message[0]
                        })
                    })
                }
            })
    }

    return (
        <>
            <Head>
                <title>Todo | Signup</title>
            </Head>
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[70vh] lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(SignupForm)}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    {...register("email", {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                />
                                <p className={'text-red-400 pl-1 pt-2 text-sm'}>{errors.email?.message}</p>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register("password", { required: 'Password is required' })}
                                />
                                <p className={'text-red-400 pl-1 pt-2 text-sm'}>{errors.password?.message}</p>
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register("confirm_password", {
                                        required: 'Confirm password is required', validate: (value) => {
                                            const { password } = getValues();
                                            return password === value || "Passwords should match!";
                                        }
                                    })}
                                />
                                <p className={'text-red-400 pl-1 pt-2 text-sm'}>{errors.confirm_password?.message}</p>
                            </div>
                            {/*<div className="flex items-start">*/}
                            {/*    <div className="flex items-center h-5">*/}
                            {/*        <input*/}
                            {/*            id="terms"*/}
                            {/*            aria-describedby="terms"*/}
                            {/*            type="checkbox"*/}
                            {/*            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"*/}
                            {/*            required=""*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*    <div className="ml-3 text-sm">*/}
                            {/*        <label*/}
                            {/*            htmlFor="terms"*/}
                            {/*            className="font-light text-gray-500 dark:text-gray-300"*/}
                            {/*        >*/}
                            {/*            I accept the{" "}*/}
                            {/*            <a*/}
                            {/*                className="font-medium text-primary-600 hover:underline dark:text-primary-500"*/}
                            {/*                href="#"*/}
                            {/*            >*/}
                            {/*                Terms and Conditions*/}
                            {/*            </a>*/}
                            {/*        </label>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <button
                                type="submit"
                                className="w-full text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800"
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;