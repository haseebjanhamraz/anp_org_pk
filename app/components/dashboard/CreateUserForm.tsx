'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateUserForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role')
        };

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            toast.success('User created successfully');
            router.push('/dashboard/users');
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error('Failed to create user');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Create User</h1>
            <ToastContainer />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold" htmlFor="name">Name</label>
                        <input
                            className="p-2 rounded-md border border-gray-300"
                            type="text"
                            name="name"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold" htmlFor="email">Email</label>
                        <input
                            className="p-2 rounded-md border border-gray-300"
                            type="email"
                            name="email"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold" htmlFor="password">Password</label>
                        <input
                            className="p-2 rounded-md border border-gray-300"
                            type="password"
                            name="password"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold" htmlFor="role">Role</label>
                        <select
                            className="p-2 rounded-md border border-gray-300"
                            name="role"
                            required
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Create User
                    </button>
                </form>
            )}
        </div>
    );
}
