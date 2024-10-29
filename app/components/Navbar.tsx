"use client"

import Image from "next/image"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import sociaMedia from "../lib/Data";

const buttons = [
    <Button key="one">Home</Button>,
    <Button key="two">About</Button>,
    <Button key="three">Contact</Button>,
    <Button key="three">Social Media</Button>,
    <Button key="three">Membership Database</Button>,
];


export const Navbar = () => {
    return (
        <div className="flex gap-4 p-3 px-8 bg-gray-100  items-center justify-between">
            <div className="flex items-center gap-4">
                <Image
                    src="/anp-logo.png"
                    width={70}
                    height={70}
                    alt="ANP Logo"
                />
                <div className="text-center">
                    <h4 className="text-2xl font-extrabold uppercase text-red-500">Awami National Party</h4>
                    <span className="text-gray-400 font-light">PEACE - DEMOCRACY - DEVELOPMENT</span>
                </div>
            </div>
            <div>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                            m: 1,
                        },
                    }}
                >
                    <ButtonGroup color="error" aria-label="Large button group">
                        {buttons}
                    </ButtonGroup>
                </Box>
            </div>
            <div className="flex">

            </div>
        </div>

    )
}





