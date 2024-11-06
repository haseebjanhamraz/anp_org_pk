'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';


export default function UploadDocumentForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const response = await fetch('/api/upload-documents', {
            method: 'POST',
            body: formData
        });
        setIsLoading(false);

        if (response.ok) {
            setError(null);
            setSuccess('Document uploaded successfully');
            toast.success('Document uploaded successfully');

            router.push('/dashboard/documents/create');
        } else {
            setError('Failed to upload document');
            toast.error('Failed to upload document');

        }
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Upload Document</h1>
            {isLoading ? <p>Loading...</p> :
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" method="post" encType="multipart/form-data" >
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold" htmlFor="name">Name</label>
                        <input className="p-2 rounded-md border border-gray-300" type="text" name="name" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold" htmlFor="publishYear">Publish Year</label>
                        <input className="p-2 rounded-md border border-gray-300" type="number" name="publishYear" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold" htmlFor="lastModifiedYear">Last Modified Year</label>
                        <input className="p-2 rounded-md border border-gray-300" type="number" name="lastModifiedYear" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold" htmlFor="category">Category</label>
                        <input className="p-2 rounded-md border border-gray-300" type="text" name="category" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold" htmlFor="language">Language</label>
                        <input className="p-2 rounded-md border border-gray-300" type="text" name="language" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold" htmlFor="file">File</label>
                        <input className="p-2 rounded-md border border-gray-300" type="file" name="file" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Upload</button>
                </form>
            }
            <ToastContainer position="top-right" autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>

    )
}