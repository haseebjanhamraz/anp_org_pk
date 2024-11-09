"use client"

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';
import ConfirmDeleteAlert from './ConfirmDeleteAlert';


interface UserData {
    _id: string;
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

const UsersList = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    const [rows, setRows] = React.useState<UserData[]>([]);
    const [loading, setLoading] = React.useState(true);

    const handleDeleteClick = (id: string) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedId) return;

        try {
            const response = await fetch(`/api/users/${selectedId}`, {

                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setRows(rows.filter(row => row._id !== selectedId));
            setOpen(false);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'name',
            headerName: 'Name',
            width: 160,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 120,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 160,
            renderCell: (params) => (
                <>
                    <Link href={`/dashboard/users/${params.row._id}/edit`}>
                        <EditIcon />
                    </Link>
                    <Link href={`/dashboard/users/${params.row._id}/view`}>
                        <VisibilityIcon />
                    </Link>
                    <DeleteIcon
                        onClick={() => handleDeleteClick(params.row._id)}
                        style={{ cursor: 'pointer' }}
                    />
                </>
            )
        }
    ];

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users', {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                const transformedData = data.users.map((row: UserData, index: number) => ({
                    ...row,
                    id: index + 1
                }));
                setRows(transformedData);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
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
                    rows={rows}
                    columns={columns}
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

export default UsersList;
