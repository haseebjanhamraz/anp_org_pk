// LeaderCard Component
'use client';
import React, { useState } from 'react';
import getLeaderData from '../../hooks/useGetSingleLeader';
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
import ShareIcon from '@mui/icons-material/Share';
import ExpandMore from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { red } from '@mui/material/colors';

function SingleLeaderDetails() {
    const { leader, loading } = getLeaderData() || { leader: {}, loading: true };
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    if (loading) return <Loader />;

    return (
        <div className="flex justify-center items-center">
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />}
                    title={leader.name}
                    subheader={`${leader.cabinet} ${leader.position}`}
                />
                <CardMedia
                    component="img"
                    height="300"
                    width="300"
                    image={leader.imageUrl}
                    alt={leader.name}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {leader.name} is the <span className='font-bold text-red-600'>{leader.cabinet} {leader.position} </span> of Awami National Party, serving since  {leader.period}. They belongs to {leader.province}.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className='flex justify-center'>
                    {/* <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton> */}
                    <span className='text-gray-500'>Show More</span>
                    <ExpandMore
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon className="cursor-pointer" />
                    </ExpandMore>

                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <ul>
                            <li>
                                Email:{' '}
                                <Link href={`mailto:${leader.email}`} className="text-red-500 hover:underline font-bold">
                                    {leader.email}
                                </Link>
                            </li>
                            <li>
                                Phone:{' '}
                                <Link href={`tel:${leader.phone}`} className="text-red-500 hover:underline font-bold">
                                    {leader.phone}
                                </Link>
                            </li>
                            <li>
                                Province: <span className="text-red-500 font-bold">{leader.province}</span>
                            </li>
                            <li>
                                Position: <span className="text-red-500 font-bold">{leader.position}</span>
                            </li>
                            <li>
                                Cabinet: <span className="text-red-500 font-bold">{leader.cabinet}</span>
                            </li>
                            <li>
                                Period: <span className="text-red-500 font-bold">{leader.period}</span>
                            </li>
                        </ul>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

export default SingleLeaderDetails;