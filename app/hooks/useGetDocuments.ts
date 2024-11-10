'use client'
import { useState, useEffect } from 'react';

interface Document {
    _id: string;
    name: string;
    publishYear: number;
    category: string;
    language: string;
    filepath: string;
    createdAt: Date;
    updatedAt: Date;
}



const useGetDocuments = (): { documents: Document[]; loading: boolean } => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState<Document[]>([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await fetch('/api/documents')
                if (!response.ok) {
                    throw new Error('Failed to fetch documents');
                }
                const data = await response.json();
                console.log(data)
                setDocuments(data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);
    return { documents, loading };
};

export default useGetDocuments;
