'use client'
import { httpClient } from '@/utils/api'
import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '@/context/tokenContext'
import { useForm } from 'react-hook-form'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { objectToArray } from '@/utils'
import TitleUpdateModal from '@/components/TitleUpdateModal'

const index = () => {
    const [todos, setTodos] = useState([])
    const tokenStatus = useContext(TokenContext)
    const [submit, setSubmit] = useState(false)
    const [loading, setLoading] = useState(true)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm({
        mode: 'onTouched',
    })

    useEffect(() => {
        if (tokenStatus === 'added') {
            httpClient
                .get(`/todos/`)
                .then((response) => {
                    setTodos(response.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [tokenStatus, submit])

    const addTodoHandler = (todo) => {
        httpClient
            .post(`/todos/`, { ...todo })
            .then((response) => {
                toast.success(response.data.message, {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                })

                reset()
                setSubmit(!submit)
            })
            .catch((err) => {
                const { data } = err.response
                if (data) {
                    // TODO -> HANDLE NON FIELD ERRORS
                    const formattedData = objectToArray(data)
                    formattedData.map((el) => {
                        setError(el.name, {
                            type: 'custom',
                            message: el.message[0],
                        })
                    })
                }
            })
    }

    const deleteTodoHandler = (id) => {
        httpClient
            .delete(`/todos/${id}`)
            .then((response) => {
                toast.success(response.data.message, {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                })
                setSubmit(!submit)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const todoStatusHandler = (id, status) => {
        if (status === 'done') {
            status = 'in_progress'
        } else {
            status = 'done'
        }
        httpClient
            .patch(`/todos/${id}`, { status })
            .then((response) => {
                setSubmit(!submit)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <Head>
                <title>Todo | Todo</title>
            </Head>

            {loading ? (
                <p className="text-center mt-8">Loading...</p>
            ) : (
                <div className="flex justify-center">
                    <div className="w-[600px] mt-8">
                        <h1 className="text-center">Task Here</h1>
                        <form
                            className="space-y-4 md:space-y-6 mt-8"
                            onSubmit={handleSubmit(addTodoHandler)}
                        >
                            <div className="flex gap-4">
                                <div className="w-full">
                                    <input
                                        className="text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                        name="todo"
                                        placeholder="Enter your task here"
                                        type="text"
                                        {...register('title', {
                                            required: 'Field is required',
                                        })}
                                    />
                                    <p
                                        className={
                                            'text-red-400 pl-1 pt-2 text-sm'
                                        }
                                    >
                                        {errors.title?.message}
                                    </p>
                                </div>
                                <button
                                    className="w-[100px] h-[45px] text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm  py-2.5 text-center dark:focus:ring-primary-800"
                                    type="submit"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                        <br />
                        <br />
                        <br />

                        {todos?.map(({ id, title, status }) => (
                            <div key={id}>
                                <div className="flex justify-between items-center gap-3 mb-4">
                                    <p
                                        className={`${status === 'done' && 'line-through'} text-md overflow-auto break-all py-2`}
                                    >
                                        {title}
                                    </p>
                                    <div className="flex gap-4">
                                        <button
                                            className={`${status === 'done' ? 'bg-green-700 hover:bg-green-900 text-white' : 'bg-yellow-300 hover:bg-yellow-500 text-black w-[100px]'} h-[40px] font-medium rounded-lg text-sm p-2 text-center focus-outline-none`}
                                            onClick={() =>
                                                todoStatusHandler(id, status)
                                            }
                                        >
                                            {status === 'done'
                                                ? 'Done'
                                                : 'In Progress'}
                                        </button>
                                        {status !== 'done' && (
                                            <TitleUpdateModal
                                                id={id}
                                                title={title}
                                                submit={submit}
                                                setSubmit={setSubmit}
                                            />
                                        )}
                                        <button
                                            className="h-[40px] text-white bg-red-500 hover:bg-red-700 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center focus:ring-4 focus:outline-none focus:ring-red-500"
                                            onClick={() =>
                                                deleteTodoHandler(id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default index
