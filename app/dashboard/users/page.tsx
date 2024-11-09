import React from 'react';
import UsersList from '@/app/components/dashboard/UsersList';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
export default function Users() {

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end">
                <Link href="/dashboard/users/create">
                    <AddIcon />
                </Link>
            </div>
            <UsersList />
        </div>
    )

}