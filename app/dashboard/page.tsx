"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
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
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-gray-600">Welcome, {user.name}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}