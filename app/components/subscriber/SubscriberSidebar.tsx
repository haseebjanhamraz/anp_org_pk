"use client";

import React from "react";
import { subscriberDashboardMenu } from "@/app/lib/Data";
import Link from "next/link";

export default function Sidebar() {
    return <div className="flex flex-col gap-4 p-4 w-64">
        <ul className="flex flex-col gap-4">
            {subscriberDashboardMenu.map((item) => (
                <li key={item.link} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors cursor-pointer bg-gray-200 dark:bg-gray-800 p-2 rounded-md">
                    <Link href={item.link || ""}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
}
