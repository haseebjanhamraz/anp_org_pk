import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import LeadershipDatabase from '../leadership-database/page';
import Downloads from '../../components/Downloads';
import PartyDetailsCard from "../../components/PartyDetailsCard"
import { Metadata } from 'next'
import { generateMetadata } from "../../MetaData";

export const metadata: Metadata = generateMetadata("/party");
export default function MediaCard() {
    return (
        <div>
            <PartyDetailsCard />
            <LeadershipDatabase />
            <Downloads />
        </div>
    );
}
