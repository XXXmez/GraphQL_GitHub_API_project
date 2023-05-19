import React, { useEffect } from "react";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { Stack, TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountItemsPerPage,
  setPaginationPage,
} from "../../redux/slice/SettingsSlice";
import { RootState } from "../../redux/store";
import {
  GET_REPOSITIRIES,
  GET_REPOSITIRIES_PREV,
} from "../../graphql/requests";
import { fetchRepositoriesAsync } from "../../redux/fetch/fetchRepositoriesAsync";

import s from "./PaginationComponent.module.scss";

const PaginationComponent: React.FC = () => {
  const sort = useSelector((state: RootState) => state.settings.sort);
  const paginationPage = useSelector(
    (state: RootState) => state.settings.paginationPage
  );
  const data = useSelector((state: RootState) => state.repositories.data);
  const loading = useSelector((state: RootState) => state.repositories.loading);
  const disabledControlButtons = {
    disabled: loading,
  };
  const repositoryCount = useSelector(
    (state: RootState) => state.settings.repositoryCount
  );
  const countItemsPerPage = useSelector(
    (state: RootState) => state.settings.countItemsPerPage
  );
  const itemSearch = useSelector(
    (state: RootState) => state.settings.itemSearch
  );
  const pageInfo = useSelector((state: RootState) => state.settings.pageInfo);

  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const [page, setPage] = React.useState(paginationPage);
  const [rowsPerPage, setRowsPerPage] = React.useState(countItemsPerPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    if (newPage < page) {
      console.log('Нажата кнопка "назад"');
      if (pageInfo.hasPreviousPage) {
        dispatch(
          fetchRepositoriesAsync({
            query: GET_REPOSITIRIES_PREV,
            name: itemSearch,
            first: countItemsPerPage,
            cursor: pageInfo.startCursor,
            sort: sort,
          })
        );
      }
    } else if (newPage > page) {
      console.log("Кнопка вперед");
      if (pageInfo.hasNextPage) {
        dispatch(
          fetchRepositoriesAsync({
            query: GET_REPOSITIRIES,
            name: itemSearch,
            first: countItemsPerPage,
            cursor: pageInfo.endCursor,
            sort: sort,
          })
        );
      }
    }
    dispatch(setPaginationPage(newPage));
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const countItemsPage: number = parseInt(event.target.value, 10);
    setRowsPerPage(countItemsPage);
    dispatch(setCountItemsPerPage(countItemsPage));
    dispatch(
      fetchRepositoriesAsync({
        query: GET_REPOSITIRIES,
        name: itemSearch,
        first: countItemsPage,
        sort: sort,
      })
    );
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
  }, [itemSearch]);

  useEffect(() => {
    if (paginationPage === 0) {
      setPage(0);
    }
  }, [paginationPage]);

  if (!data.length) {
    return <></>;
  }

  return (
    <Stack className={s.stack}>
      <TablePagination
        SelectProps={disabledControlButtons}
        backIconButtonProps={disabledControlButtons}
        nextIconButtonProps={disabledControlButtons}
        component="div"
        count={repositoryCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default PaginationComponent;
