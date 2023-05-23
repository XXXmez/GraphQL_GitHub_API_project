import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import UserSelect from "../UserSelect/UserSelect";
import ListSearch from "../ListSearch/ListSearch";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import s from "./Content.module.scss";

const Content: React.FC = () => {
  const dataRepositories = useSelector(
    (state: RootState) => state.repositories.data
  );
  const loadingRepositories = useSelector(
    (state: RootState) => state.repositories.loading
  );

  if (!dataRepositories.length && !loadingRepositories) {
    return (
      <Box className={s.content}>
        <Typography className={s.content_welcome_message}>
          Добро пожаловать
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container className={s.content}>
      <Grid item xs={8}>
        <ListSearch />
      </Grid>
      <Grid item xs={4} className={s.content_select}>
        <UserSelect />
      </Grid>
    </Grid>
  );
};

export default Content;
