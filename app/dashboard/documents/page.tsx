import React from 'react';
import Link from 'next/link';
import DocumentsList from '../../components/dashboard/DocumentsList';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
export default function Documents() {
    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold dark:text-white mb-4'> Manage Documents</h1>
                <Link href="/dashboard/documents/create">
                    <Button variant="outlined" startIcon={<Add />}>Create Document</Button>
                </Link>
            </div>
            <DocumentsList />
        </div>
    );
}