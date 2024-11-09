"use client"

import { useEffect, useState } from "react"


export default function useUser() {
    const [user, setUser] = useState<{ name: string, email: string, role: string } | null>(null)
    useEffect(() => {
        // Get user data from sessionStorage on component mount
        const userData = sessionStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        } else {
            return
        }
    }, [])
    return user
}