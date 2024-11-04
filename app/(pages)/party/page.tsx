"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LeaderCard from '@/app/components/LeaderCard';
import { useState } from 'react';
import Downloads from '@/app/components/Downloads';
export default function MediaCard() {
    const [selectedYear, setSelectedYear] = useState<string>('all');

    return (
        <>
            <div className='flex justify-center gap-4 flex-wrap'>
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
                <div className='flex flex-col items-center'>
                    <h2 className='text-2xl font-bold dark:text-white'>
                        Downloads
                    </h2>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="mt-2 mb-4 p-2 rounded-md border dark:bg-slate-700 dark:text-white"
                    >
                        <option value="all">All Years</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>
                    <Downloads year={selectedYear} />
                </div>
            </div>
            <h1 className='mt-10 text-center text-2xl font-bold dark:text-white '>ANP Leadership</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10">
                <LeaderCard />
            </div>
        </>
    );
}
