import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LeaderCard from '@/app/components/LeaderCard';

export default function MediaCard() {
    return (
        <>
            <div>
                <Card sx={{ maxWidth: 345 }} className='dark:bg-slate-200 p-4'>
                    <CardMedia
                        sx={{ height: 140, objectFit: "contain" }}
                        image="/anp-logo.png"
                        title="ANP Logo"
                        component='img'
                        classes="MuiCardMedia-img"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Party Information
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            <span>
                                Party Name : <strong>Awami National Party</strong>
                            </span>
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            <span>
                                Founder : <strong>Khan Abdul Wali Khan</strong>
                            </span>
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            <span>
                                Founded: <strong>1986</strong>
                            </span>
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            <span>
                                Election Symbol: <strong>Lantern</strong>
                            </span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-4 gap-4 m-10">
                <LeaderCard />
            </div>
        </>
    );
}
