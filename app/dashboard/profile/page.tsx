"use client"

import { Button } from "@mui/material"
import { useState } from "react"
import useUser from '../../hooks/useUser';

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false)
    const user = useUser()
    const [name, setName] = useState(user?.name || "")
    const [email, setEmail] = useState(user?.email || "")
    const handleSave = () => {
        fetch(`/api/user`, {
            method: 'PUT',
            body: JSON.stringify({ name, email }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    return (
        <div className="min-h-screen flex">
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold dark:text-white mb-4">Profile Settings</h1>
                    <Button
                        variant="outlined"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            disabled={!isEditing}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            value={user?.name}
                                            onChange={(e) => setName(e.target.value)}

                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            disabled={!isEditing}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            value={user?.email}
                                            onChange={(e) => setEmail(e.target.value)}

                                        />
                                    </div>
                                </div>
                                {/* Update password */}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex justify-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSave}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
