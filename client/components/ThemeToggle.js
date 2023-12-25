import {useTheme} from 'next-themes'
import {Moon, Sun} from "lucide-react"
import {useEffect, useState} from "react";

export default function Home() {
    const {theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const dark = ''
    const light = ''

    return (
        <div>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="py-1 px-2 rounded-3xl bg-indigo-800">
                {mounted && theme === 'light'
                    ? <Sun className="text-white"/>
                    : <Moon className="text-white"/>
                }
            </button>
        </div>
    )
}