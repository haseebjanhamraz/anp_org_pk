"use client"

import { Button } from "@mui/material"
import { useState, useEffect } from "react"
import { Edit, Save, Cancel } from "@mui/icons-material"
import { useSession } from "next-auth/react"

interface FormData {
    name: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function Profile() {
    const { data: session } = useSession()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')

    useEffect(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                name: session.user.name || '',
                email: session.user.email || ''
            }))
        }
    }, [session])

    const handleSave = async () => {
        setError('')
        
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setError("New passwords don't match")
            return
        }

        try {
            const response = await fetch(`/api/user/${session?.user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            })
            
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || 'Failed to update profile')
            }
            
            const data = await response.json()
            setIsEditing(false)
            // Reset password fields
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }))
        } catch (error) {
            console.error('Error updating profile:', error)
            setError(error instanceof Error ? error.message : 'Failed to update profile')
        }
    }

    const handleCancel = () => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                name: session.user.name || '',
                email: session.user.email || '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }))
        }
        setError('')
        setIsEditing(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="min-h-screen flex">
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold dark:text-white mb-4">Profile Settings</h1>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="space-y-6">
                        <div className="relative">
                            <div className="absolute top-0 right-0">
                                {!isEditing ? (
                                    <Button
                                        startIcon={<Edit />}
                                        variant="outlined"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit Profile
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button
                                            startIcon={<Save />}
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            startIcon={<Cancel />}
                                            variant="outlined"
                                            color="error"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {error && (
                                <div className="mb-4 text-red-500 text-sm">{error}</div>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Personal Information</h3>
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    disabled={!isEditing}
                                                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                                                        isEditing ? 'bg-white dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'
                                                    }`}
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                            <div className="mt-1">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    disabled={!isEditing}
                                                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                                                        isEditing ? 'bg-white dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'
                                                    }`}
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Change Password</h3>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                                                <div className="mt-1">
                                                    <input
                                                        type="password"
                                                        name="currentPassword"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        value={formData.currentPassword}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                                                <div className="mt-1">
                                                    <input
                                                        type="password"
                                                        name="newPassword"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        value={formData.newPassword}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                                                <div className="mt-1">
                                                    <input
                                                        type="password"
                                                        name="confirmPassword"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
