import { useState, useEffect } from 'react';
import { CabinetType } from '../types/Cabinets';

export const useCabinet = () => {
    const [cabinets, setCabinets] = useState<CabinetType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCabinets = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem('token');
            const response = await fetch('/api/cabinets', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cabinets');
            }

            const data = await response.json();
            setCabinets(data.cabinets);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const createCabinet = async (cabinetType: string) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('/api/cabinets/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ cabinetType })
            });

            if (!response.ok) {
                throw new Error('Failed to create cabinet');
            }

            await fetchCabinets();
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return false;
        }
    };

    const updateCabinet = async (id: string, cabinetType: string) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch(`/api/cabinets/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ cabinetType })
            });

            if (!response.ok) {
                throw new Error('Failed to update cabinet');
            }

            await fetchCabinets();
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return false;
        }
    };

    const deleteCabinet = async (id: string) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch(`/api/cabinets/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete cabinet');
            }

            await fetchCabinets();
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return false;
        }
    };

    useEffect(() => {
        fetchCabinets();
    }, []);

    return {
        cabinets,
        loading,
        error,
        fetchCabinets,
        createCabinet,
        updateCabinet,
        deleteCabinet
    };
};
