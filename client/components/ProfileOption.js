import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const ProfileOption = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false)
    let menuRef = useRef()

    let handleClickOutside = (e) => {
        if (!menuRef.current.contains(e.target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    return (
        <div className="relative">
            <div ref={menuRef}>
                <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="sr-only">Open user menu</span>
                    <img
                        className="w-8 h-8 rounded-full"
                        src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1705503233~exp=1705503833~hmac=e04fdc0a042600dbaec95343908acc87907d93feef72e520e39d32120eb93891"
                        alt="user photo"
                    />
                </button>

                <div
                    className={`${isOpen ? '' : 'hidden'} absolute top-6 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                >
                    <div className="px-4 py-3">
                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                            {user}
                        </span>
                    </div>
                    <ul className="py-2">
                        <li>
                            <Link
                                onClick={() => setIsOpen(false)}
                                href="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Profile
                            </Link>
                        </li>
                        <li
                            onClick={() => signOut()}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Logout
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileOption
