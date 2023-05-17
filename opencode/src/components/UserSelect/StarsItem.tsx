import React from "react";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import "./UserSelect.css";

const StarsItem: React.FC<{ count: number }> = ({ count }) => {
  return (
    <Box className="stars-item">
      <StarIcon className="stars-item__icon" />
      <span>{count}</span>
    </Box>
  );
};

export default StarsItem;
