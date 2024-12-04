'use client'
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

import FileIcon from '@mui/icons-material/FilePresent';
import { Document } from '../types/Document';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
interface DownloadsListProps {
    documents: Document[];
}


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function DownloadsList({ documents }: DownloadsListProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // Get unique categories
    const categories = Array.from(new Set(documents.map(doc => doc.category)));

    return (
        <div>
            {documents.length > 0 ? (
                <Box sx={{ width: '100%', zIndex: -1 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} className='dark:text-white text-white' aria-label="document categories">
                            {categories.map((category, index) => (
                                <Tab className='text-red-500 dark:text-white' key={category} label={category} {...a11yProps(index)} />
                            ))}
                        </Tabs>
                    </Box>
                    {categories.map((category, index) => (
                        <CustomTabPanel key={category} value={value} index={index}>
                            <List className='dark:text-white'>
                                {documents
                                    .filter(doc => doc.category === category)
                                    .map(doc => (
                                        <div className='flex mb-4' key={doc._id}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar className=' dark:bg-red-800'>
                                                        <FileIcon className='text-red-500 dark:text-white' />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    className='text-red-500 dark:text-white'
                                                    primary={doc.name}
                                                    secondary={`Published in ${doc.publishYear}`}
                                                />
                                            </ListItem>
                                            <Link href={`/display-doc/${doc._id}`} target="_blank" rel="noopener noreferrer">
                                                <Button variant="contained" color="error">
                                                    View
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                            </List>
                        </CustomTabPanel>
                    ))}
                </Box>
            ) : (
                <div className='flex justify-center items-center'>
                    <h1 className='text-lg text-red-500'>No documents found!!!</h1>
                </div>
            )}
        </div>
    );
}