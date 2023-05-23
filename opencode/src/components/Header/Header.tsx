import React, { useEffect, useState } from "react";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AppBar, Toolbar, Stack, Button, OutlinedInput } from "@mui/material";
import { GET_REPOSITIRIES } from "../../graphql/requests";
import { setPaginationPage } from "../../redux/slice/SettingsSlice";
import { fetchRepositoriesAsync } from "../../redux/fetch/fetchRepositoriesAsync";
import SnackbarComponent from "./SnackbarComponent";

import s from "./Header.module.scss";

const Header: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const isEmpty: boolean = useSelector(
    (state: RootState) => state.repositories.isEmpty
  );
  const sort: string = useSelector((state: RootState) => state.settings.sort);
  const isError: boolean = useSelector(
    (state: RootState) => state.repositories.isError
  );
  const countItemsPage: number = useSelector(
    (state: RootState) => state.settings.countItemsPerPage
  );

  // desc от топа к низу
  // asc от низа к топу
  // sort:stars-asc
  // forks
  // updated

  const [valueInputSearch, setValueInputSearch] = useState("");

  // стейты для сообщений
  const [showEmptyFieldError, setShowEmptyFieldError] = useState(false);
  const [showLoadingError, setShowLoadingError] = useState(false);
  const [showNothingFound, setShowNothingFound] = useState(false);

  const handlerClickSeach = () => {
    if (valueInputSearch.trim() === "") {
      setShowEmptyFieldError(true);
      return;
    }

    dispatch(
      fetchRepositoriesAsync({
        query: GET_REPOSITIRIES,
        name: `${valueInputSearch}`,
        first: countItemsPage,
        sort: sort,
      })
    );

    dispatch(setPaginationPage(0));
    console.log("Поиск", valueInputSearch);
  };

  const handleSnackbarClose = () => {
    setShowEmptyFieldError(false);
    setShowLoadingError(false);
    setShowNothingFound(false);
  };

  useEffect(() => {
    if (isError) {
      setShowLoadingError(true);
    }

    if (isEmpty) {
      setShowNothingFound(true);
    }
  }, [isError, isEmpty]);

  return (
    <AppBar className={s.appBar} position="static">
      <Toolbar>
        <Stack spacing={2} direction="row" className={s.appBar_stack}>
          <OutlinedInput
            value={valueInputSearch}
            onChange={(e) => setValueInputSearch(e.target.value)}
            placeholder="Введите поисковый запрос"
            className={s.appBar_outlinedInput}
          />
          <Button
            variant="contained"
            className={s.appBar_searchButton}
            onClick={handlerClickSeach}
          >
            Найти
          </Button>
        </Stack>
      </Toolbar>
      <SnackbarComponent
        open={showEmptyFieldError}
        onClose={handleSnackbarClose}
        message="Введите поисковый запрос"
      />
      <SnackbarComponent
        open={showLoadingError}
        onClose={handleSnackbarClose}
        message="Произошла ошибка"
      />
      <SnackbarComponent
        open={showNothingFound}
        onClose={handleSnackbarClose}
        message="Ничего не найдено"
      />
    </AppBar>
  );
};

export default Header;
