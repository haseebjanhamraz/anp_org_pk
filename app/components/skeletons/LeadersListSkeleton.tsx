import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Skeleton from '@mui/material/Skeleton';

export default function LeadersListSkeleton() {
    return (
        <div className="grid w-full">
            <div className="flex justify-center">
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {[...Array(3)].map((_, index) => (
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Skeleton variant="circular" width={40} height={40} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Skeleton width="60%" />}
                                secondary={<Skeleton width="40%" />}
                            />
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
}
