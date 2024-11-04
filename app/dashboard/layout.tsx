"use client";

import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DarkModeToggle from "../components/DarkModeToggle";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<{ name: string, email: string } | null>(null)
    const router = useRouter()

    useEffect(() => {
        // Get user data from localStorage on component mount
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        } else {
            router.push('/login')
        }
    }, [router])

    const handleLogout = () => {
        fetch('/api/auth/logout', {
            method: 'POST',
        })
            .then(res => res.json())
            .then(() => {
                // Clear localStorage and redirect to login
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                router.push('/login')
            })
            .catch(err => {
                console.error('Logout error:', err)
                // Still clear localStorage and redirect on error
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                router.push('/login')
            });
    }

    if (!user) {
        return <div>Loading...</div>
    }
    return (
        <>
            <div className="flex justify-between items-center ">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-300">Welcome, {user.name}</p>
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
                <Sidebar />
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </>
    );
}
