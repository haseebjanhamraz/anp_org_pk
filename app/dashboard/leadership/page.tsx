"use client"


import LeadershipTable from "../../components/dashboard/LeadershipTable"
import Link from "next/link"
import { Button } from "@mui/material"
import { Add } from "@mui/icons-material"
        
export default function Leadership() {
    return (    
        <div className="min-h-screen flex">
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold dark:text-white mb-4">Manage Leadership</h1>
                    <Link href="/dashboard/leadership/create" className="flex gap-2">
                        <Button variant="outlined" startIcon={<Add />}>Create Leadership</Button>
                    </Link>
                </div>
                <LeadershipTable />
            </main>
        </div>
    )
}