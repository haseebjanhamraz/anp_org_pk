"use client";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import useGetLeadership from '../hooks/useGetLeadership';
import Image from "next/image";
import Loader from "./Loader"


export default function LeadershipDatabase() {
    const { leaders, loading } = useGetLeadership();

    const columns: GridColDef[] = [
        {
            field: 'imageUrl',
            headerName: 'Image',
            width: 100,
            renderCell: (params) => (
                <Image
                    src={params.value}
                    alt="🚩"
                    width={50}
                    height={50}
                    className="rounded-full object-cover w-10 h-10"
                />
            )
        },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 200 },
        { field: 'position', headerName: 'Position', width: 200 },
        { field: 'cabinet', headerName: 'Cabinet', width: 200 },
        { field: 'province', headerName: 'Province', width: 200 },
        { field: 'period', headerName: 'Period', width: 100 },
    ];

    const rows = leaders.map((leader, index) => ({
        id: index,
        ...leader
    }));

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {loading && <Loader />}
            <h1 className='text-4xl mb-10 dark:text-white font-semibold text-center'>
                Leadership Database
            </h1>
            <Paper sx={{ height: 'auto', width: '100%', maxWidth: '100%' }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 15, 20]}
                    loading={loading}
                    sx={{
                        textAlign: 'center',
                        border: 0,
                        '& .MuiDataGrid-cell': {
                            color: 'inherit',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            color: 'inherit',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            color: 'inherit',
                        },
                    }}
                />
            </Paper>
        </div>
    );
}
