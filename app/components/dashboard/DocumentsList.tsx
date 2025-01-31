"use client"

import React, { useEffect, useState } from "react"
import { DataGrid, GridColDef, GridRenderEditCellParams, GridRowModes, GridActionsCellItem } from "@mui/x-data-grid"
import { IconButton } from "@mui/material"
import { Delete, Edit, Save, Cancel, Visibility } from "@mui/icons-material"
import Link from "next/link"
import ConfirmDeleteAlert from "./ConfirmDeleteAlert"
import useDeleteDocument from "../../hooks/useDeleteDocument"

interface Document {
    _id: string;
    name: string;
    category: string;
    filepath: string;
    publishYear: string;
    isNew?: boolean;
}

export default function DocumentsList() {
    const [documents, setDocuments] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)
    const [rowModesModel, setRowModesModel] = useState({})
    const { deleteDocument, loading: deleteLoading, error } = useDeleteDocument()
    const [open, setOpen] = useState(false)
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)

    const handleRowEditStart = (params: any, event: any) => {
        event.defaultMuiPrevented = true
    }

    const handleRowEditStop = (params: any, event: any) => {
        event.defaultMuiPrevented = true
    }

    const handleEditClick = (id: string) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
    }

    const handleSaveClick = (id: string) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    }

    const handleCancelClick = (id: string) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        })
    }

    const processRowUpdate = async (newRow: Document) => {
        try {
            const response = await fetch(`/api/documents/${newRow._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRow),
            })
            
            if (!response.ok) throw new Error('Failed to update document')
            
            const updatedDocument = await response.json()
            setDocuments(docs => 
                docs.map(doc => (doc._id === newRow._id ? updatedDocument : doc))
            )
            return updatedDocument
        } catch (error) {
            console.error('Error updating document:', error)
            throw error
        }
    }

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
        { 
            field: 'name', 
            headerName: 'Title', 
            width: 200,
            editable: true 
        },
        { 
            field: 'category', 
            headerName: 'Category', 
            width: 150,
            editable: true 
        },
        { 
            field: 'filepath', 
            headerName: 'File', 
            width: 300,
            editable: true 
        },
        { 
            field: 'publishYear', 
            headerName: 'Publish Year', 
            width: 100,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

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
                    ]
                }

                return [
                    <GridActionsCellItem
                        key="edit"
                        icon={<Edit />}
                        label="Edit"
                        onClick={handleEditClick(id as string)}
                    />,
                    <GridActionsCellItem
                        key="delete"
                        icon={<Delete />}
                        label="Delete"
                        onClick={() => {
                            const doc = documents.find(d => d._id === id)
                            if (doc) {
                                setSelectedDocument(doc)
                                setOpen(true)
                            }
                        }}
                    />,
                ]
            }
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
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={(error) => {
                        console.error('Error processing row update:', error)
                    }}
                    slots={{
                        toolbar: null,
                    }}
                    slotProps={{
                        toolbar: {},
                    }}
                />
            </div>
        </>
    )
}
