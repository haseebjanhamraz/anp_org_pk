"use client";
import getLeaderData from "../../../../hooks/useGetSingleLeader";
import Loader from "../../../../components/Loader";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LeadershipData } from "../../../../types/leadership";
import Link from "next/link";

const ExpandMore = styled((props: { expand: boolean; onClick: () => void }) => {
    const { expand, onClick, ...other } = props;
    return <IconButton onClick={onClick} {...other} />;
})(({ theme, expand }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
}));

export default function RecipeReviewCard() {
    const { leader, loading } = getLeaderData() as {
        leader: LeadershipData[];
        loading: boolean;
    };
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="flex justify-center items-center">
            {loading ? <Loader /> : (
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            </Avatar>
                        }
                        title={leader.name}
                        subheader={`${leader.cabinet} ${leader.position}`}
                    />
                    <CardMedia
                        component="img"
                        height="300"
                        width="300"
                        image={leader.imageUrl}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {leader.name} is the {leader.cabinet} {leader.position} of Awami
                            National Party, He is serving since {leader.period}. He belongs to{" "}
                            {leader.province}.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
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
                                <li>Email: {""}
                                    <Link href={`mailto:${leader.email}`}
                                        className="text-red-500 hover:underline font-bold">
                                        {leader.email}
                                    </Link>
                                </li>
                                <li>Phone:
                                    <Link href={`tel:${leader.phone}`}
                                        className="text-red-500 hover:underline font-bold">
                                        {leader.phone}
                                    </Link>
                                </li>
                                <li>Province:
                                    <span className="text-red-500 font-bold">
                                        {leader.province}
                                    </span>
                                </li>
                                <li>Position:
                                    <span className="text-red-500 font-bold">
                                        {leader.position}
                                    </span>
                                </li>
                                <li>Cabinet:
                                    <span className="text-red-500 font-bold">
                                        {leader.cabinet}
                                    </span>
                                </li>
                                <li>Period:
                                    <span className="text-red-500 font-bold">
                                        {leader.period}
                                    </span>
                                </li>

                            </ul>
                        </CardContent>
                    </Collapse>
                </Card>
            )}
        </div>
    );
}
