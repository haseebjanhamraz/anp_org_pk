import React from 'react';
import UploadDocumentForm from '@/app/components/dashboard/UploadDocumentForm';

export default function CreateDocument() {
    return <div className="flex flex-col gap-4">
        <UploadDocumentForm />
    </div>;
}