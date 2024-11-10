'use client'
import { useState, useEffect } from 'react';

export interface Leader {
    _id: string;
    name: string;
    position: string;
    imageUrl: string;
    period: string;
    socialMedia: {
        platform: string;
        url: string;
    }[];
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const useGetLeadership = (): { leaders: Leader[]; loading: boolean } => {
    const [loading, setLoading] = useState(true);
    const [leaders, setLeaders] = useState<Leader[]>([]);

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const response = await fetch('/api/leadership')
                if (!response.ok) {
                    throw new Error('Failed to fetch leadership');
                }
                const data = await response.json();
                setLeaders(data);
            } catch (error) {
                console.error('Error fetching leadership:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaders();
    }, []);

    return { leaders, loading };
};

export default useGetLeadership;
