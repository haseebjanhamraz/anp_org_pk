"use client";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import useGetLeadership from '../hooks/useGetLeadership';
import Image from 'next/image';
import LeadersListSkeleton from './skeletons/LeadersListSkeleton';
import { CabinetBadge } from './CabinetBadge';
import { cabinets } from '../lib/Data';

export default function LeaderCard(props) {
    const { leaders, loading } = useGetLeadership();

    // Group leaders by cabinet
    const leadersByCabinet = React.useMemo(() => {
        return leaders.reduce((acc, leader) => {
            if (!acc[leader.cabinet]) {
                acc[leader.cabinet] = [];
            }
            acc[leader.cabinet].push(leader);
            return acc;
        }, {} as Record<string, typeof leaders>);
    }, [leaders]);
    return (
        <>
            {!loading && leaders.length === 0 ? <p className='text-gray-500 dark:text-white'>No Entries Found</p> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 m-10 rounded-md dark:bg-slate-800 bg-slate-100 dark:text-white p-2">
                    {loading && <LeadersListSkeleton />}
                    {!loading && (
                        <>
                            {cabinets.map((cabinet, index) => (
                                <div key={index} className="justify-center bg-gray-50 dark:bg-slate-900 rounded-lg p-3">
                                    <List sx={{ width: '100%', maxWidth: 360 }}>
                                        {leadersByCabinet[cabinet]?.map((leader, leaderIndex) => (
                                            <ListItem key={leader._id || leaderIndex}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <Image
                                                            src={leader.imageUrl && leader.imageUrl !== '' ? leader.imageUrl : '/default-avatar.png'}
                                                            alt={leader.name}
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={props.leader}
                                                    secondary={`${leader.position} ${leader.period}`}
                                                />
                                                <CabinetBadge cabinetType={cabinet.toUpperCase()} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </>
    );
}