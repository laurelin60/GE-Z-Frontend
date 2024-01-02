"use client";
import React from "react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <button
            onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
            className='text-red-500'>
            Toggle Mode
        </button>
    )
};


export default ThemeToggle;