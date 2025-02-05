"use client";

import React, { useState } from "react";
import { dashboardMenu } from '../../lib/Data';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-200 dark:bg-gray-800"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div className={`
                fixed lg:static inset-y-0 left-0 z-10
                transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0 transition duration-200 ease-in-out
                flex flex-col gap-4 p-4 w-64 min-h-screen
                bg-white dark:bg-gray-900 shadow-lg lg:shadow-none
            `}>

                <ul className="flex flex-col gap-4 mt-8">
                    {dashboardMenu.map((item) => (
                        <li key={item.link}>
                            <Link 
                                href={item.link || ""} 
                                className={`
                                    flex items-center gap-3 p-3 rounded-lg
                                    text-gray-600 dark:text-gray-300 
                                    hover:text-gray-800 dark:hover:text-gray-100
                                    hover:bg-gray-100 dark:hover:bg-gray-800
                                    transition-all duration-200
                                    ${pathname === item.link ? 
                                        "bg-red-500 dark:bg-red-500 text-white dark:text-white font-bold" : 
                                        "bg-gray-50 dark:bg-gray-800"}
                                `}
                                onClick={() => setIsOpen(false)}
                            >
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-0"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
