import React from "react";
import { Box } from "@mui/material";

import "./UserSelect.css";

const TechnologyItem: React.FC<{
  technology: string | null;
  main: boolean;
}> = ({ technology, main }) => {
  const style = main
    ? "technology-item technology-item__main"
    : "technology-item";

  return (
    <Box component="div" className={style}>
      <span>{technology ? technology : "-"}</span>
    </Box>
  );
};

export default TechnologyItem;
