'use client'
import useGetDocuments from '../hooks/useGetDocuments';
import DownloadsList from './DownloadsList';
import DownloadsListSkeleton from './skeletons/DownloadsListSkeleton';
import React from 'react';
import { Divider } from '@mui/material';

const Downloads = () => {

    const { documents, loading } = useGetDocuments();
    return (
        <div className='my-10'>
            <h1 className='text-4xl text-red-500 dark:text-red-700 font-semibold mb-4 text-center'>Downloads</h1>
            <Divider className='w-1/2 mx-auto' sx={{ borderColor: "red" }} />
            <React.Suspense fallback={<DownloadsListSkeleton />}>
                {loading ? (
                    <DownloadsListSkeleton />
                ) : (
                    <DownloadsList documents={documents} />
                )}
            </React.Suspense>
        </div>
    );
};

export default Downloads;