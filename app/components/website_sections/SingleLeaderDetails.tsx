// LeaderCard Component
"use client";
import React, { useEffect, useState, useMemo } from "react";
import useGetLeaderData from "../../hooks/useGetSingleLeader";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { red } from "@mui/material/colors";
import LeaderCardSkeleton from "../skeletons/LeaderCardSkeleton";

export interface LeadershipData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  province: string;
  position: string;
  cabinet: string;
  period: string;
  imageUrl: string;
  socialMedia: {
    platform: string;
    url: string;
  }[];
}

function SingleLeaderDetails() {
  const { leader, loading } = useGetLeaderData() || {
    leader: {} as LeadershipData,
    loading: true,
  };
  const [color, setColor] = useState("#fff");
  const [expanded, setExpanded] = useState(false);

  const avatarColors = useMemo(() => [
    "#FF0000", // Red
    "#FF4D4D", // Light Red
    "#FF6666", // Medium Red
    "#FF9999", // Soft Red
    "#FFB3B3", // Pale Red
    "#FFCCCC", // Misty Red
    "#FF6666", // Coral Red
    "#FF4C4C", // Salmon Red
    "#FF5E5E", // Tomato Red
    "#FF3B3B", // Ruby Red
    "#FF1A1A", // Crimson Red
    "#FF3333", // Brick Red
    "#FF5733", // Tangerine Red
    "#FF754D", // Hot Red
    "#FF6347", // Pepper Red
    "#FF2E2E", // Rose Red
    "#FF4000", // Burgundy Red
    "#FF6F61", // Maroon Red
    "#FF7F50", // Scarlet Red
    "#FF0033", // Garnet Red
    "#FF4500", // Flame Red
    "#FF3030", // Burnt Orange Red
    "#FF5500", // Cherry Red
    "#FF6659", // Blood Red
    "#FF0000", // Deep Red (Duplicate for emphasis)
  ], []);

  useEffect(() => {
    const rang = avatarColors[Math.floor(Math.random() * avatarColors.length)];
    setColor(rang);
  }, [avatarColors]);

  const handleExpandClick = () => setExpanded(!expanded);

  if (loading) return <LeaderCardSkeleton />;
  if (!leader) return <div>No leader data available.</div>;

  return (
    <div className="flex justify-center items-center">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: color }}
              className="font-bold"
              aria-label="avatar"
            >
              {(leader as LeadershipData).name?.charAt(0)}
            </Avatar>
          }
          title={(leader as LeadershipData).name}
          subheader={`${(leader as LeadershipData).cabinet} ${
            (leader as LeadershipData).position
          }`}
        />
        <CardMedia
          component="img"
          height="300"
          image={(leader as LeadershipData).imageUrl}
          alt={(leader as LeadershipData).name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {(leader as LeadershipData).name} is the{" "}
            <span className="font-bold text-red-600">
              {(leader as LeadershipData).cabinet}{" "}
              {(leader as LeadershipData).position}
            </span>{" "}
            of Awami National Party, serving since{" "}
            {(leader as LeadershipData).period?.slice(0, 4)}. They belong to{" "}
            {(leader as LeadershipData).province}.
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="flex justify-center">
          <span
            className="text-gray-500 cursor-pointer"
            onClick={handleExpandClick}
          >
            {expanded ? "Show Less" : "Show More"}
          </span>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <ul>
              <li>
                Email:{" "}
                <Link
                  href={`mailto:${(leader as LeadershipData).email}`}
                  className="text-red-500 hover:underline font-bold"
                >
                  {(leader as LeadershipData).email}
                </Link>
              </li>
              <li>
                Phone:{" "}
                <Link
                  href={`tel:${(leader as LeadershipData).phone}`}
                  className="text-red-500 hover:underline font-bold"
                >
                  {(leader as LeadershipData).phone}
                </Link>
              </li>
              <li>
                Province:{" "}
                <span className="text-red-500 font-bold">
                  {(leader as LeadershipData).province}
                </span>
              </li>
              <li>
                Position:{" "}
                <span className="text-red-500 font-bold">
                  {(leader as LeadershipData).position}
                </span>
              </li>
              <li>
                Cabinet:{" "}
                <span className="text-red-500 font-bold">
                  {(leader as LeadershipData).cabinet}
                </span>
              </li>
              <li>
                Period:{" "}
                <span className="text-red-500 font-bold">
                  {(leader as LeadershipData).period}
                </span>
              </li>
            </ul>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default SingleLeaderDetails;
