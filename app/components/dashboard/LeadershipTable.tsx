"use client"

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

// Define the interface for your leadership data
interface LeadershipData {
    _id: string;
    name: string;
    position: string;
    period: string;
    description: string;
    imageUrl: string;
    socialMedia: any[];
    createdAt: string;
    updatedAt: string;
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'fullName',
        headerName: 'Full name',
        width: 160,
        valueGetter: (value, row) => `${row.name || ''}`,
    },
    {
        field: 'position',
        headerName: 'Position',
        width: 160,
        valueGetter: (value, row) => `${row.position || ''}`,
    },
    {
        field: 'period',
        headerName: 'Period',
        width: 160,
        valueGetter: (value, row) => `${row.period || ''}`,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 160,
        valueGetter: (value, row) => `${row.description || ''}`,
    },
];

export default function LeadershipTable() {
    const [rows, setRows] = React.useState<LeadershipData[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchLeadershipData = async () => {
            try {
                const response = await fetch('/api/leadership/');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const transformedData = data.map((row: LeadershipData, index: number) => ({
                    ...row,
                    id: index + 1
                }));
                setRows(transformedData);
            } catch (error) {
                console.error('Error fetching leadership data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeadershipData();
    }, []);

    return (
        <Paper sx={{ height: 'auto', width: '100%' }}>
            <DataGrid
                rows={rows || []}
                columns={columns || []}
                getRowId={(row) => row.id}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5, page: 0 }
                    }
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ boxShadow: '3px 3px 10px 0px rgba(0, 0, 0, 0.1)' }}
                disableRowSelectionOnClick
                loading={loading}
            />

        </Paper>
    );
}