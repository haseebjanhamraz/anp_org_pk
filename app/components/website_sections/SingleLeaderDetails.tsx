// LeaderCard Component
'use client';
import React, { useState } from 'react';
import useGetLeaderData from '../../hooks/useGetSingleLeader';
import Loader from '../Loader';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { red } from '@mui/material/colors';


export interface LeadershipData {
    _id: string;
    name: string;
    email: string;
    phone: string;
    province: string;
    position: string;
    cabinet: string;
    period: string;
    imageUrl: string;
    socialMedia: {
        platform: string;
        url: string;
    }[];
}

function SingleLeaderDetails() {
    const { leader, loading } = useGetLeaderData() || { leader: {} as LeadershipData, loading: true };
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => setExpanded(!expanded);

    if (loading) return <Loader />;
    if (!leader) return <div>No leader data available.</div>;

    return (
        <div className="flex justify-center items-center">
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {(leader as LeadershipData).name?.charAt(0)}
                        </Avatar>
                    }
                    title={(leader as LeadershipData).name}
                    subheader={`${(leader as LeadershipData).cabinet} ${(leader as LeadershipData).position}`}
                />
                <CardMedia
                    component="img"
                    height="300"
                    image={(leader as LeadershipData).imageUrl}
                    alt={(leader as LeadershipData).name}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {(leader as LeadershipData).name} is the{' '}
                        <span className="font-bold text-red-600">
                            {(leader as LeadershipData).cabinet} {(leader as LeadershipData).position}
                        </span>{' '}
                        of Awami National Party, serving since {(leader as LeadershipData).period?.slice(0, 4)}. They belong to{' '}
                        {(leader as LeadershipData).province}.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className="flex justify-center">
                    <span className="text-gray-500 cursor-pointer" onClick={handleExpandClick}>
                        {expanded ? 'Show Less' : 'Show More'}
                    </span>
                    <IconButton
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <ul>
                            <li>
                                Email:{' '}
                                <Link
                                    href={`mailto:${(leader as LeadershipData).email}`}
                                    className="text-red-500 hover:underline font-bold"
                                >
                                    {(leader as LeadershipData).email}
                                </Link>
                            </li>
                            <li>
                                Phone:{' '}
                                <Link
                                    href={`tel:${(leader as LeadershipData).phone}`}
                                    className="text-red-500 hover:underline font-bold"
                                >
                                    {(leader as LeadershipData).phone}
                                </Link>
                            </li>
                            <li>
                                Province:{' '}
                                <span className="text-red-500 font-bold">{(leader as LeadershipData).province}</span>
                            </li>
                            <li>
                                Position:{' '}
                                <span className="text-red-500 font-bold">{(leader as LeadershipData).position}</span>
                            </li>
                            <li>
                                Cabinet:{' '}
                                <span className="text-red-500 font-bold">{(leader as LeadershipData).cabinet}</span>
                            </li>
                            <li>
                                Period:{' '}
                                <span className="text-red-500 font-bold">{(leader as LeadershipData).period}</span>
                            </li>
                        </ul>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

export default SingleLeaderDetails;
