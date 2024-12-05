'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { LeadershipData } from '../../../../types/leadership';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

export default function ViewLeadership() {
    const params = useParams();
    const [leadership, setLeadership] = React.useState<LeadershipData | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchLeadership = async () => {
            try {
                const response = await fetch(`/api/leadership/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch leadership data');
                }
                const data = await response.json();
                setLeadership(data);
            } catch (error) {
                console.error('Error fetching leadership:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeadership();
    }, [params.id]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!leadership) {
        return <Typography>Leadership not found</Typography>;
    }

    return (
        <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto', my: 4 }} className="dark:bg-gray-800">
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Avatar
                        src={leadership.imageUrl}
                        alt={leadership.name}
                        sx={{ width: 200, height: 200, mx: 'auto' }}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" fontWeight="bold" className="dark:text-white rounded-md" gutterBottom>
                        {leadership.name}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" className="dark:text-white rounded-md" gutterBottom>
                        {leadership.position}
                    </Typography>
                    <Typography variant="subtitle1" className="dark:text-white rounded-md" gutterBottom>
                        Period:
                        <span className="dark:text-white font-bold ml-2 rounded-md">
                            {leadership.period}
                        </span>
                    </Typography>
                    <Typography className="dark:text-white rounded-md">
                        {leadership.email}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" fontWeight="bold" className='dark:text-white p-2 rounded-md' gutterBottom>
                            Social Media
                        </Typography>
                        {leadership.socialMedia.map((social, index) => (
                            <Link
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ mr: 2 }}
                                className="dark:text-white p-2 rounded-md"
                            >
                                {social.platform === 'facebook' ? <Facebook /> : social.platform === 'twitter' ? <Twitter /> : social.platform === 'instagram' ? <Instagram /> : ""}
                            </Link>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
