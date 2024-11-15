'use client'
import { useState, useEffect } from 'react';
import { LeadershipData } from '../types/leadership';

const useGetLeadership = (): { leaders: LeadershipData[]; loading: boolean } => {
    const [loading, setLoading] = useState(true);
    const [leaders, setLeaders] = useState<LeadershipData[]>([]);

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
