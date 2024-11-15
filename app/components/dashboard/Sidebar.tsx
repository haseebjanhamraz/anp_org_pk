"use client";

import React from "react";
import { dashboardMenu } from '../../lib/Data';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();
    return <div className="flex flex-col gap-4 p-4 w-64">
        <ul className="flex flex-col gap-4">
            {dashboardMenu.map((item) => (
                <li key={item.link} className={`text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors cursor-pointer bg-gray-200 dark:bg-gray-800 p-2 rounded-md 
                ${pathname === item.link ? " dark:bg-red-500 font-bold border-l-4 border-red-500 dark:border-l-4 dark:border-white " : ""}`}>
                    <Link href={item.link || ""} className="dark:text-white">
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
}
