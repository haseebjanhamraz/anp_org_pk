"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LeaderCard from '@/app/components/LeaderCard';
import Downloads from '@/app/components/Downloads';
export default function MediaCard() {

    return (
        <>
            <div className='flex flex-col items-center m-10 mb-20 justify-center gap-4 flex-wrap'>
                <Card sx={{ maxWidth: 345 }} className='dark:bg-slate-700 dark:text-white p-4'>
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
                        <Typography variant="body2" >
                            <span>
                                Party Name : <strong>Awami National Party</strong>
                            </span>
                        </Typography>
                        <Typography variant="body2" >
                            <span>
                                Founder : <strong>Khan Abdul Wali Khan</strong>
                            </span>
                        </Typography>
                        <Typography variant="body2" >
                            <span>
                                Founded: <strong>1986</strong>
                            </span>

                        </Typography>
                        <Typography variant="body2" >
                            <span>
                                Election Symbol: <strong>Lantern</strong>
                            </span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className='flex-2 gap-4 items-top'>
                <div>
                    <h2 className='text-2xl font-bold dark:text-white'>
                        Downloads
                    </h2>
                    <Downloads />
                </div>
                <div>
                    <h1 className='text-2xl font-bold dark:text-white '>ANP Leadership</h1>
                    <LeaderCard />
                </div>
            </div>
        </>
    );
}
