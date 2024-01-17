'use client'
import { httpClient } from '@/utils/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export async function getServerSideProps(context) {
    const searchParams = new URLSearchParams(context.query)
    const uid = searchParams.get('uid')
    const token = searchParams.get('token')
    // ... use query to fetch data

    return {
        props: {
            uid,
            token,
        },
    }
}

const Index = ({ uid, token }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (uid && token) {
            let payload = {
                uid: uid,
                email_confirm_token: token,
            }
            httpClient
                .post('/email-verify/', payload)
                .then((res) => {
                    toast.success(res.data.message)
                    router.push('/login')
                })
                .catch((err) => {
                    const { data: errors } = err.response

                    if ('non_field_errors' in errors) {
                        console.log(errors.non_field_errors[0])
                        toast.error(errors.non_field_errors[0])
                    } else {
                        toast.error('Internal server error!')
                    }
                    router.push('/login')
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            toast.error('Invalid account activation URL!')
            router.push('/login')
        }
    }, [])

    return (
        <div className="w-full mt-5 flex flex-col items-center">
            {loading ? (
                'Loading...'
            ) : (
                <Link href="/login" className="underline">
                    Login Now
                </Link>
            )}
        </div>
    )
}

export default Index
