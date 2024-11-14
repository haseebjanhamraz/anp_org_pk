"use client"

import React, { useEffect, useState } from "react"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { IconButton } from "@mui/material"
import { Delete, Edit, Visibility } from "@mui/icons-material"
import Link from "next/link"
import ConfirmDeleteAlert from "./ConfirmDeleteAlert"
import useDeleteDocument from "../../hooks/useDeleteDocument"
interface Document {
    _id: string;
    name: string;
    category: string;
    filepath: string;
    publishYear: number;
}

export default function DocumentsList() {
    const [documents, setDocuments] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)
    const { deleteDocument, loading: deleteLoading, error } = useDeleteDocument();
    const [open, setOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

    const handleDelete = () => {
        if (selectedDocument) {
            deleteDocument(selectedDocument._id)
                .then(() => {
                    setDocuments(documents.filter(doc => doc._id !== selectedDocument._id))
                    setOpen(false)
                })
        }
    }

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

    const columns: GridColDef[] = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Title', width: 200 },
        { field: 'category', headerName: 'Category', width: 300 },
        { field: 'filepath', headerName: 'File', width: 300 },
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
                            setSelectedDocument(params.row)
                            setOpen(true)
                        }}
                    >
                        <Delete />
                    </IconButton>
                    <Link href={`/dashboard/documents/${params.row._id}/view`}>
                        <IconButton size="small">
                            <Visibility />
                        </IconButton>
                    </Link>
                </div>
            )
        }
    ]

    return (
        <>
            <ConfirmDeleteAlert open={open} setOpen={setOpen} onConfirm={handleDelete} />
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
                    loading={loading}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </>
    )
}
