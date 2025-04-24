"use client";

import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import SubscriberSidebar from "../components/subscriber/SubscriberSidebar";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Header from "../components/dashboard/Header";
import Loader from "../components/Loader";

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
        return <Loader />
    }

    return (
        <>
            <Header />
            <div className="flex min-h-screen dark:text-white">
                {session.user?.role === "admin" || session.user?.role === "editor" ? <Sidebar /> : <SubscriberSidebar />}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </>
    );
}