"use client"

import LeadershipTable from "@/app/components/dashboard/LeadershipTable"
export default function Leadership() {


    return (
        <div className="min-h-screen flex">
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <h1 className="text-2xl font-bold dark:text-white">Manage Leadership</h1>
                <LeadershipTable />
            </main>
        </div>
    )
}