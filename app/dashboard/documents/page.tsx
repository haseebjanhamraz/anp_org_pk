import React from 'react';
import Link from 'next/link';

export default function Documents() {
    return <div>
        <h1>Documents</h1>
        <Link href="/dashboard/documents/create">Create Document</Link>
    </div>;
}