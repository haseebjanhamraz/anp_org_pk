import React from "react";
import { CircularProgress } from "@mui/material";

interface LoaderProps {
  size?: number;
}

const Loader = ({ size = 40 }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <CircularProgress size={size} className="text-red-500" />
    </div>
  );
};

export default Loader;
