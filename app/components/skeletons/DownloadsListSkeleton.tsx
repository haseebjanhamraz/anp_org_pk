'use client'
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function DownloadsListSkeleton() {
    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={0} aria-label="loading document categories">
                        {[1, 2, 3].map((_, index) => (
                            <Tab key={index} label={<Skeleton width={100} />} />
                        ))}
                    </Tabs>
                </Box>
                <Box sx={{ p: 3 }}>
                    <List className='dark:text-white'>
                        {[1, 2, 3, 4].map((_, index) => (
                            <div key={index} className='flex mb-4'>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Skeleton variant="circular">
                                            <Avatar />
                                        </Skeleton>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Skeleton width={200} />}
                                        secondary={<Skeleton width={140} />}
                                    />
                                </ListItem>
                                <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
                            </div>
                        ))}
                    </List>
                </Box>
            </Box>
        </div>
    );
}
