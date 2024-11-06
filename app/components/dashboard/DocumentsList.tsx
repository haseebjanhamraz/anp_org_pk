"use client"

import { useEffect, useState } from "react"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { IconButton } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import Link from "next/link"

export default function DocumentsList() {
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/documents")
            .then(res => res.json())
            .then(data => {
                setDocuments(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    // Define columns for the DataGrid
    const columns: GridColDef[] = [
        // Define columns for the DataGrid
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Title', width: 200 },
        { field: 'category', headerName: 'Category', width: 300 },
        { field: 'publishYear', headerName: 'Publish Year', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <Link href={`/dashboard/documents/${params.row._id}/edit`}>
                        <IconButton size="small">
                            <Edit />
                        </IconButton>
                    </Link>
                    <IconButton
                        size="small"
                        onClick={() => {
                            // TODO: Implement delete functionality

                            console.log('Delete document:', params.row._id)
                        }}
                    >
                        <Delete />
                    </IconButton>
                </div>
            )
        }
    ]

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={documents}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    )
}
