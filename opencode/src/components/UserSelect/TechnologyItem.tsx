import React from "react";
import { Box } from "@mui/material";

const TechnologyItem: React.FC<{
  technology: string | null;
  main: boolean;
}> = ({ technology, main }) => {
  const style = {
    borderRadius: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    fontSize: "14px",
    padding: "3px 10px",
    background: "rgba(0, 0, 0, 0.08);",
    color: "black",
  };

  if (main) {
    style.padding = "7px 10px";
    style.background = "#2196F3";
    style.color = "white";
  }

  return (
    <Box component="div" sx={style}>
      <span>{technology ? technology : "-"}</span>
    </Box>
  );
};

export default TechnologyItem;
