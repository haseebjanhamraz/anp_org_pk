'use client'
import useGetDocuments from '@/app/hooks/useGetDocuments';
import DownloadsList from './DownloadsList';
import DownloadsListSkeleton from './skeletons/DownloadsListSkeleton';
import { Suspense } from 'react';

const Downloads = () => {

    const { documents, loading } = useGetDocuments();
    return (
        <div>
            <Suspense fallback={<DownloadsListSkeleton />}>
                {loading ? (
                    <DownloadsListSkeleton />
                ) : (
                    <DownloadsList documents={documents} />
                )}
            </Suspense>
        </div>
    );
};

export default Downloads;