"use client"

import Link from "next/link"
import { Button } from "@mui/material"
import { Add } from "@mui/icons-material"
import LeadershipForm from "@/app/components/dashboard/LeadershipForm"

export default function Leadership() {


    return (
        <div className="min-h-screen flex">
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold dark:text-white mb-4">Create Leadership</h1>
                </div>
                <LeadershipForm />
            </main>
        </div>
    )
}