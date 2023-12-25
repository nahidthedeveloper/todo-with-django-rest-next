import {useTheme} from 'next-themes'
import ThemeToggle from "@/components/ThemeToggle.js";
export default function Home() {
    return (
        <div>
          <ThemeToggle/>
        </div>
    )
}