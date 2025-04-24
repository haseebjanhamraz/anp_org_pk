//useAchievements.ts
"use client";

import { Achievement } from "@/app/types/Achievements";
import { useState } from "react";
import { paginate } from "@/utils/paginate";

export default function useAchievements() {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const fetchAchievements = async (page = currentPage, size = pageSize) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/achievements?page=${page}&pageSize=${size}`);
            if (!response.ok) {
                throw new Error('Failed to fetch achievements');
            }
            const data = await response.json();
            setAchievements(data.data);
            setTotalPages(data.totalPages);
            setTotalItems(data.totalItems);
            setCurrentPage(data.currentPage);
            setPageSize(data.pageSize);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch achievements');
        } finally {
            setLoading(false);
        }
    };

    const addAchievement = async (achievement: Achievement) => {
        try {
            setLoading(true);
            const response = await fetch('/api/achievements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(achievement),
            });
            if (!response.ok) {
                throw new Error('Failed to add achievement');
            }
            const data = await response.json();
            setAchievements(prev => [...prev, data]);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to add achievement');
        } finally {
            setLoading(false);
        }
    };

    return {
        achievements,
        loading,
        error,
        fetchAchievements,
        addAchievement,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalPages,
        totalItems
    };
}
