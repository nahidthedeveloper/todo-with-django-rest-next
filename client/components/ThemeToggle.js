import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    return (
        <div>
            <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="py-1 px-2 rounded-3xl"
            >
                {mounted && theme === 'light' ? (
                    <Sun className="text-black dark:text-white" />
                ) : (
                    <Moon className="text-black dark:text-white" />
                )}
            </button>
        </div>
    )
}
