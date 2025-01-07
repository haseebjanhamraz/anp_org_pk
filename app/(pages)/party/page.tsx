import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import LeadershipDatabase from '../leadership-database/page';
import Downloads from '../../components/Downloads';
import PartyDetailsCard from "../../components/PartyDetailsCard"

export default function MediaCard() {
    return (
        <div>
            <PartyDetailsCard />
            <LeadershipDatabase />
            <Downloads />
        </div>
    );
}
