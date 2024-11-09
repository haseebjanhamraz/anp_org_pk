import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import LeadershipEditForm from './LeadershipEditForm';
import { useRouter } from 'next/navigation';

export default function SimpleBackdrop() {
    const router = useRouter();
    const [open, setOpen] = React.useState(true);
    const handleClose = (e: React.MouseEvent) => {
        console.log('clicked');

        // prevent backdrop from closing when clicking on the form
        e.stopPropagation();
        setOpen(false);
        router.push('/dashboard/leadership');
    };

    return (
        <div>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
            >
                <LeadershipEditForm />
            </Backdrop>
        </div>
    );
}
