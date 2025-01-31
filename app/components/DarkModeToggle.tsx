"use client"

import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

export default function DarkModeToggle(): JSX.Element {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage for the saved theme mode on initial load
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      setIsDark(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    // Add or remove the dark class on the HTML element
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      aria-label="Theme Toggle"
      className="p-2  rounded"
    >
      {isDark ? (
        <MdLightMode className="text-red-500 text-2xl" />
      ) : (
        <MdDarkMode className="text-slate-500 text-2xl" />
      )}
    </button>
  );
}
