import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";

function LeaderCardSkeleton() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card sx={{ width: 345 }}>
        <CardHeader
          avatar={
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ bgcolor: red[100] }}
            />
          }
          title={
            <Skeleton
              variant="text"
              width="60%"
              height={20}
              sx={{ bgcolor: red[100] }}
            />
          }
          subheader={
            <Skeleton
              variant="text"
              width="40%"
              height={15}
              sx={{ bgcolor: red[100] }}
            />
          }
        />
        <CardMedia>
          <Skeleton
            variant="rectangular"
            width={345}
            height={300}
            sx={{ bgcolor: red[100] }}
          />
        </CardMedia>
        <CardContent>
          <Skeleton
            variant="text"
            width="80%"
            height={20}
            sx={{ bgcolor: red[100], marginBottom: 1 }}
          />
          <Skeleton
            variant="text"
            width="60%"
            height={20}
            sx={{ bgcolor: red[100], marginBottom: 1 }}
          />
        </CardContent>
        <CardActions disableSpacing>
          <Skeleton
            variant="rectangular"
            width={70}
            height={30}
            sx={{ bgcolor: red[100], borderRadius: "4px" }}
          />
          <IconButton>
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              sx={{ bgcolor: red[100] }}
            />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default LeaderCardSkeleton;
