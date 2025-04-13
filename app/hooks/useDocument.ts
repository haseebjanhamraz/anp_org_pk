import { useState, useEffect } from 'react';
import { IDocument } from '../models/Downloads';

interface DocumentResponse extends Omit<IDocument, '_id'> {
    _id?: string;
    publicUrl?: string;
}

interface UseDocumentReturn {
    document: DocumentResponse | null;
    loading: boolean;
    error: Error | null;
}

const useDocument = (id: string): UseDocumentReturn => {
    const [document, setDocument] = useState<DocumentResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await fetch(`/api/documents/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch document');
                }
                const data = await response.json();
                setDocument(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch document'));
                setDocument(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDocument();
        }
    }, [id]);

    return { document, loading, error };
};

export default useDocument;