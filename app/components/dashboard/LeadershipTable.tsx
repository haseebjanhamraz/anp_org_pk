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
        description: 'This column has a value getter and is not sortable.',
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
                const transformedData = data.map((row: LeadershipData) => ({
                    ...row,
                    id: row._id
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
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows || []}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5, page: 0 }
                    }
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
                loading={loading}
            />
        </Paper>
    );
}