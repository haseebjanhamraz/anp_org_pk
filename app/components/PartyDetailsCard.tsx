import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { partyDetails } from "../../lib/Data";

export default function PartyDetailsCard() {
    return (
        <div className="flex flex-col items-center m-10 mb-20 justify-center gap-4">
            <Card sx={{ maxWidth: 345 }} className="dark:bg-slate-800 rounded-md drop-shadow-md dark:text-white p-4">
                <CardMedia
                    sx={{ height: 140, objectFit: "contain" }}
                    image="/anp-logo.png"
                    title="ANP Logo"
                    component="img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="text-center">
                        Party Details
                    </Typography>
                    {Object.entries(partyDetails).map(([key, value], index) => (
                        <Typography key={index} variant="body2">
                            <span className="text-gray-500 dark:text-gray-200">
                                {key}: <br /> <strong className="text-red-700 dark:text-red-600">{value}</strong>
                            </span>
                        </Typography>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
