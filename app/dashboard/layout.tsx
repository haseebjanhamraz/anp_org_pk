"use client";

import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DarkModeToggle from "../components/DarkModeToggle";
import AnimatedLoader from "../components/Animated-Loader";
import SubscriberSidebar from "../components/subscriber/SubscriberSidebar";
import BackButton from "../components/dashboard/BackButton";

export default function DashboardLayout(
    {
        children,
    }: {
        children: React.ReactNode;
    }) {
    const [user, setUser] = useState<{ name: string, email: string, role: string } | null>(null)
    const router = useRouter()

    useEffect(() => {
        // Get user data from sessionStorage on component mount
        const userData = sessionStorage.getItem('user')
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
                // Clear sessionStorage and redirect to login
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('user')
                router.push('/login')
            })
            .catch(err => {
                console.error('Logout error:', err)
                // Still clear sessionStorage and redirect on error
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('user')
                router.push('/login')
            });
    }

    if (!user) {
        return <AnimatedLoader />
    }
    return (
        <>
            <div className="flex justify-between items-center ">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Welcome,
                            <span className="font-bold"> {user.name} ({user.role})</span>
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
                {user.role === "admin" || user.role === "editor" ? <Sidebar /> : <SubscriberSidebar />}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </>
    );
}