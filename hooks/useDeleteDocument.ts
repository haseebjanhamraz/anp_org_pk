import { useState } from 'react';

interface UseDeleteDocumentReturn {
    deleteDocument: (id: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const useDeleteDocument = (): UseDeleteDocumentReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteDocument = async (id: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`/api/documents/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete document');
            }
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setLoading(false);
        }
    };

    return { deleteDocument, loading, error };
};

export default useDeleteDocument;
