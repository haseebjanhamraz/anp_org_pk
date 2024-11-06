import React from 'react';
import Link from 'next/link';
import DocumentsList from '@/app/components/dashboard/DocumentsList';
export default function Documents() {
    return <div>
        <h1>Documents</h1>
        <Link href="/dashboard/documents/create">Create Document</Link>
        <DocumentsList />
    </div>;
}