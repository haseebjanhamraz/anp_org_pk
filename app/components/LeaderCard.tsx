import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import useGetLeadership from '@/app/hooks/useGetLeadership';
import Image from 'next/image';
import LeadersListSkeleton from './skeletons/LeadersListSkeleton';
import Divider from '@mui/material/Divider';
export default function FolderList() {
    const { leaders, loading } = useGetLeadership();
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10 rounded-md dark:bg-slate-800 bg-slate-100 dark:text-white p-2">
                {loading && <LeadersListSkeleton />}
                {!loading && (
                    <>
                        <div className="justify-center">
                            <h1 className="text-2xl font-medium text-red-500 dark:text-red-500 text-center mt-2">Central Cabinet</h1>
                            <Divider className='my-2 bg-red-800' />
                            <List sx={{ width: '100%', maxWidth: 360 }}>
                                {leaders.map((leader, index) => (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Image src={leader.imageUrl && leader.imageUrl !== '' ? leader.imageUrl : '/default-avatar.png'}
                                                    alt={leader.name} width={100} height={100} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={leader.name} secondary={`${leader.position} ${leader.period}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}