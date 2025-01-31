"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import ConfirmDeleteAlert from "./ConfirmDeleteAlert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export default function UsersList() {
    const { data: session } = useSession()
    const [open, setOpen] = React.useState(false)
    const [selectedId, setSelectedId] = React.useState<string | null>(null)
    const [users, setUsers] = React.useState<User[]>([])
    const [loading, setLoading] = React.useState(true)
    const [rowModesModel, setRowModesModel] = React.useState({})

    const handleEditClick = (id: string) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: string) => () => {
        const editedRow = users.find(user => user._id === id);
        if (editedRow) {
            processRowUpdate(editedRow)
                .then(() => {
                    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
                })
                .catch((error) => {
                    console.error('Save failed:', error);
                    toast.error('Failed to update user');
                });
        }
    };

    const handleCancelClick = (id: string) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    const processRowUpdate = async (newRow: User) => {
        try {
            const response = await fetch(`/api/users/${newRow._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newRow.name,
                    email: newRow.email,
                    role: newRow.role
                }),
            });
            
            if (!response.ok) throw new Error('Failed to update user');
            
            const updatedUser = await response.json();
            setUsers(users => 
                users.map(user => (user._id === newRow._id ? { ...user, ...updatedUser } : user))
            );
            toast.success('User updated successfully');
            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };

    const handleDeleteClick = (id: string) => {
        setSelectedId(id)
        setOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (!selectedId) return;

        try {
            const response = await fetch(`/api/users/${selectedId}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Failed to delete user")
            }

            setUsers(users.filter((user) => user._id !== selectedId))
            toast.success("User deleted successfully")
            setOpen(false)
        } catch (error) {
            console.error("Error deleting user:", error)
            toast.error("Failed to delete user")
        }
    }

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            width: 200,
            editable: true
        },
        {
            field: "email",
            headerName: "Email",
            width: 250,
            editable: true
        },
        {
            field: "role",
            headerName: "Role",
            width: 120,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['user', 'editor', 'admin']
        },
        
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            type: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key="save"
                            icon={<Save />}
                            label="Save"
                            onClick={handleSaveClick(id as string)}
                        />,
                        <GridActionsCellItem
                            key="cancel"
                            icon={<Cancel />}
                            label="Cancel"
                            onClick={handleCancelClick(id as string)}
                        />
                    ];
                }

                return [
                    <GridActionsCellItem
                        key="edit"
                        icon={<Edit />}
                        label="Edit"
                        onClick={handleEditClick(id as string)}
                        disabled={session?.user.role !== 'admin'}
                    />,
                    <GridActionsCellItem
                        key="delete"
                        icon={<Delete />}
                        label="Delete"
                        onClick={() => handleDeleteClick(id as string)}
                        disabled={session?.user.role !== 'admin'}
                    />
                ];
            }
        }
    ]

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users")
                if (!response.ok) {
                    throw new Error("Failed to fetch users")
                }
                const data = await response.json()
                setUsers(data)
            } catch (error) {
                console.error("Error fetching users:", error)
                toast.error("Failed to fetch users")
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    return (
        <>
            <ConfirmDeleteAlert
                open={open}
                setOpen={setOpen}
                onConfirm={handleConfirmDelete}
            />
            <Paper className="p-4">
                <DataGrid
                    rows={users}
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    loading={loading}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onProcessRowUpdateError={(error) => {
                        console.error('Error processing row update:', error);
                        toast.error('Failed to update user');
                    }}
                    processRowUpdate={processRowUpdate}
                    disableRowSelectionOnClick
                    autoHeight
                />
            </Paper>
        </>
    )
}
