"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { leadership } from "../lib/Data"
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from 'next/link';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

export default function LeaderCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (
        <>
            {leadership.map((leader, index) => (
                <Card key={index} sx={{ maxWidth: 345 }}>
                    <CardHeader
                        title={leader.name}
                        subheader={leader.position}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={leader.image}
                        alt={`${leader.name}'s image`}
                    />
                    <CardContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {leader.intro}
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing className='flex justify-center gap-4 items-center sticky bottom-4'>
                        <IconButton aria-label="add to favorites">
                            <Link href={leader.social.facebook.link}>
                                <FacebookIcon />
                            </Link>
                        </IconButton>
                        <IconButton aria-label="share">
                            <Link href={leader.social.twitter.link}>
                                <TwitterIcon />
                            </Link>
                        </IconButton>
                        <IconButton aria-label="share">
                            <Link href={leader.social.instagram.link}>
                                <InstagramIcon />
                            </Link>
                        </IconButton>
                        <IconButton aria-label="share">
                            <Link href={`mailto:${leader.social.email}`}>
                                <EmailIcon />
                            </Link>
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
        </>
    );
}
