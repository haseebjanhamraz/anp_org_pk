"use client"


import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';
import ConfirmDeleteAlert from './ConfirmDeleteAlert';
import { useCabinet } from '@/app/hooks/useCabinet';
import { toast } from '@/app/hooks/use-toast';


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



const LeadershipTable = () => {
    const { cabinets } = useCabinet();
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState<string | null>(null);


    const handleDeleteClick = (id: string) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedId) return;
        try {
            const response = await fetch(`/api/leadership/${selectedId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete leadership entry');
            }

            // Update the table by filtering out the deleted row
            setRows(rows.filter(row => row._id !== selectedId));
            setOpen(false);

            toast({
                title: "Success",
                description: "Leadership entry deleted successfully",
                variant: "default",
            });

        } catch (error) {
            console.error("Error deleting leadership:", error);
            toast({
                title: "Error",
                description: "Failed to delete leadership entry",
                variant: "destructive",
            });
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'fullName',
            headerName: 'Full name',
            width: 160,
            valueGetter: (value, row) => `${row.name || ''}`,
            flex: 1
        },
        {
            field: 'cabinet',
            headerName: 'Cabinet',
            width: 160,
            // Get the cabinet name from the cabinet id
            valueGetter: (value, row) => {
                const cabinet = cabinets.find((cabinet) => cabinet._id === row.cabinet);
                return cabinet?.cabinetType ? cabinet.cabinetType.charAt(0).toUpperCase() + cabinet.cabinetType.slice(1) : '';
            },
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
        {
            field: 'actions',
            headerName: 'Actions',
            width: 160,
            renderCell: (params) =>
                <>
                    <Link href={`/dashboard/leadership/${params.row._id}/edit`}>
                        <EditIcon />
                    </Link>
                    <Link href={`/dashboard/leadership/${params.row._id}/view`}>
                        <VisibilityIcon />
                    </Link>
                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleDeleteClick(params.row._id)} />
                </>
        }
    ];

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
        <>
            <ConfirmDeleteAlert
                open={open}
                setOpen={setOpen}
                onConfirm={handleConfirmDelete}
            />
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
        </>
    );
}

export default LeadershipTable;