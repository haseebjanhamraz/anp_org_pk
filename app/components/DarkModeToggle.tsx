import { useEffect, useState } from 'react';
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";


export default function DarkModeToggle(): JSX.Element {
    const [isDark, setIsDark] = useState<boolean>(() => {
        // Check localStorage for the saved theme mode on initial load
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme === 'dark';
        }
        return false; // Default to light mode if no preference is found
    });

    useEffect(() => {
        // Add or remove the dark class on the HTML element
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="p-2  rounded"
        >
            {isDark ? <MdLightMode className='text-red-500 text-2xl' /> : <MdDarkMode className='text-red-500 text-2xl' />}
        </button>
    );
}
