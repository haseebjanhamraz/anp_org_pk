"use client";

import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { signOut } from "next-auth/react"
import DarkModeToggle from "../components/DarkModeToggle";
import SubscriberSidebar from "../components/subscriber/SubscriberSidebar";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"



export default function DashboardLayout(
    {
        children,
    }: {
        children: React.ReactNode;
    }) {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login')
        }
    })

    if (status === "loading") {
        return <div>Loading...</div>
    }

    const handleLogout = () => {
        signOut({ callbackUrl: "/login" })
    }

    return (
        <>
            <div className="flex justify-between items-center ">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Welcome,
                            <span className="font-bold"> {session.user.name}</span>
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
                <DarkModeToggle />
            </div>
            <div className="flex min-h-screen dark:text-white">
                {session.user?.role === "admin" || session.user?.role === "editor" ? <Sidebar /> : <SubscriberSidebar />}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </>
    );
}