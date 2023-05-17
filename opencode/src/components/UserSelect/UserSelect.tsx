import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

import TechnologyItem from "./TechnologyItem";
import StarsItem from "./StarsItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import "./UserSelect.css";

const UserSelect: React.FC = () => {
  const selectedRepository = useSelector(
    (state: RootState) => state.selectedRepos
  );

  if (!selectedRepository.selected) {
    return (
      <Box className="no-user-select">
        <p>Выберите репозитарий</p>
      </Box>
    );
  }

  return (
    <Box className="user-select">
      <Typography className="user-select__title">
        {selectedRepository.name}
      </Typography>
      <Box className="user-select__items">
        <TechnologyItem technology={selectedRepository.mainLang} main={true} />
        <StarsItem count={selectedRepository.countStars} />
      </Box>
      <Box className="user-select__languages">
        {selectedRepository.languages.map((lang, ind) => (
          <TechnologyItem key={ind} technology={lang} main={false} />
        ))}
      </Box>
      <Box className="user-select__license">
        <p>{selectedRepository.license || "No license information"}</p>
      </Box>
    </Box>
  );
};

export default UserSelect;
