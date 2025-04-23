'use client'
import { useState } from 'react';

const useLeadership = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteAllLeadership = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch('/api/leadership', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete leadership data');
            }

            setSuccess(true);
        } catch (error) {
            console.error('Error deleting leadership:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return { deleteAllLeadership, loading, success, error };
};

export default useLeadership;