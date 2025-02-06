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
    const [editingField, setEditingField] = useState<string | null>(null)
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

    const handleSave = async (field: string) => {
        setError('')
        
        if (field === 'password') {
            if (formData.newPassword !== formData.confirmPassword) {
                setError("New passwords don't match")
                return
            }
            if (!formData.currentPassword || !formData.newPassword) {
                setError("Please fill in all password fields")
                return
            }
        }

        try {
            const dataToUpdate = field === 'password' 
                ? { 
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword 
                }
                : { [field]: formData[field as keyof FormData] }

            const response = await fetch(`/api/users/${session?.user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...dataToUpdate,
                    updateField: field
                }),
            })
            
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || 'Failed to update profile')
            }
            
            const data = await response.json()
            setEditingField(null)
            
            if (field === 'password') {
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }))
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            setError(error instanceof Error ? error.message : 'Failed to update profile')
        }
    }

    const handleCancel = (field: string) => {
        if (field === 'password') {
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }))
        } else if (session?.user) {
            setFormData(prev => ({
                ...prev,
                [field]: session.user[field as keyof typeof session.user] || ''
            }))
        }
        setError('')
        setEditingField(null)
    }

    const renderField = (field: string, label: string) => {
        const isEditing = editingField === field
        return (
            <div className="relative mb-6 pb-4 border-b dark:border-gray-700">
                <div className="flex justify-between items-start mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                    {!isEditing ? (
                        <Button
                            startIcon={<Edit />}
                            variant="outlined"
                            size="small"
                            onClick={() => setEditingField(field)}
                        >
                            Edit
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                startIcon={<Save />}
                                variant="contained"
                                size="small"
                                onClick={() => handleSave(field)}
                            >
                                Save
                            </Button>
                            <Button
                                startIcon={<Cancel />}
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleCancel(field)}
                            >
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
                <input
                    type="text"
                    name={field}
                    disabled={!isEditing}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        isEditing ? 'bg-white dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                    value={formData[field as keyof FormData]}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                />
            </div>
        )
    }

    const renderPasswordSection = () => {
        const isEditing = editingField === 'password'
        return (
            <div className="relative mb-6 pb-4">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Password</h3>
                    {!isEditing ? (
                        <Button
                            startIcon={<Edit />}
                            variant="outlined"
                            size="small"
                            onClick={() => setEditingField('password')}
                        >
                            Change Password
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                startIcon={<Save />}
                                variant="contained"
                                size="small"
                                onClick={() => handleSave('password')}
                            >
                                Save
                            </Button>
                            <Button
                                startIcon={<Cancel />}
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleCancel('password')}
                            >
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
                {isEditing && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                            <input
                                type="password"
                                name="currentPassword"
                                className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.currentPassword}
                                onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.newPassword}
                                onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="min-h-screen flex">
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <h1 className="text-2xl font-bold dark:text-white mb-6">Profile Settings</h1>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    {error && (
                        <div className="mb-4 text-red-500 text-sm">{error}</div>
                    )}

                    <div className="space-y-6">
                        {renderField('name', 'Name')}
                        {renderField('email', 'Email')}
                        {renderPasswordSection()}
                    </div>
                </div>
            </main>
        </div>
    )
}
