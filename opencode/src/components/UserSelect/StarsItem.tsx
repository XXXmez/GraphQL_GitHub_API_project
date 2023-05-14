import React from "react";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const StarsItem: React.FC<{ count: number }> = ({ count }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <StarIcon sx={{ color: "orange", mr: 1 }} />
      <span>{count}</span>
    </Box>
  );
};

export default StarsItem;
