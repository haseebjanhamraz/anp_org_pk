'use client'
import useGetDocuments from '../hooks/useGetDocuments';
import DownloadsList from './DownloadsList';
import DownloadsListSkeleton from './skeletons/DownloadsListSkeleton';
import React from 'react';

const Downloads = () => {

    const { documents, loading } = useGetDocuments();
    return (
        <div>
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