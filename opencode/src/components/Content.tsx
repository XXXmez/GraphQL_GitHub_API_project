import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import UserSelect from "./UserSelect/UserSelect";
import ListSearch from "./ListSearch/ListSearch";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Content: React.FC = () => {
  const dataRepositories = useSelector(
    (state: RootState) => state.repositories.data
  );
  const loadingRepositories = useSelector(
    (state: RootState) => state.repositories.loading
  );

  if (!dataRepositories.length && !loadingRepositories) {
    return (
      <Box
        minHeight={"calc(100vh - 64px)"}
        display="flex"
        alignItems={"center"}
        justifyContent="center"
      >
        <Typography fontSize={46} color="#4F4F4F">
          Добро пожаловать
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container style={{ minHeight: "calc(100vh - 64px)", height: "auto" }}>
      <Grid item xs={8}>
        <ListSearch />
      </Grid>
      <Grid item xs={4} sx={{ background: "#f2f2f2" }}>
        <UserSelect />
      </Grid>
    </Grid>
  );
};

export default Content;
