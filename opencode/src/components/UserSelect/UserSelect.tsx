import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

import TechnologyItem from "./TechnologyItem";
import StarsItem from "./StarsItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const UserSelect: React.FC = () => {
  const selectedRepository = useSelector(
    (state: RootState) => state.selectedRepos
  );

  if (!selectedRepository.selected) {
    return (
      <Box
        padding="24px"
        position="sticky"
        top="0"
        height={"100%"}
        display="flex"
        justifyContent="center"
        alignItems={"center"}
      >
        <p>Выберите репозитарий</p>
      </Box>
    );
  }

  return (
    <Box padding="24px" position="sticky" top="0">
      <Typography sx={{ fontSize: "32px" }}>
        {selectedRepository.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
        }}
      >
        <TechnologyItem technology={selectedRepository.mainLang} main={true} />
        <StarsItem count={selectedRepository.countStars} />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          marginTop: "16px",
          flexWrap: "wrap",
        }}
      >
        {selectedRepository.languages.map((lang, ind) => (
          <TechnologyItem key={ind} technology={lang} main={false} />
        ))}
      </Box>
      <Box sx={{ marginTop: "24px" }}>
        <p>{selectedRepository.license || "No license information"}</p>
      </Box>
    </Box>
  );
};

export default UserSelect;
