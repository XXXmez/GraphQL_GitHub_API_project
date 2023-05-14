import React, { useEffect, useRef, useState } from "react";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../redux/slice/SettingsSlice";
import { GET_REPOSITIRIES } from "../../graphql/requests";
import { RootState } from "../../redux/store";
import { fetchRepositoriesAsync } from "../../redux/fetch/fetchRepositoriesAsync";

const TableHeader: React.FC = () => {
  const itemSearch = useSelector(
    (state: RootState) => state.settings.itemSearch
  );
  const countItemsPage = useSelector(
    (state: RootState) => state.settings.countItemsPerPage
  );

  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const firstEntry = useRef(false);
  const [sortOrder, setSortOrder] = useState("");
  const [sortColumn, setSortColumn] = useState("");

  const handleSort = (column: string): void => {
    firstEntry.current = true;
    let newOrder = "desc";
    if (column === sortColumn && sortOrder === "desc") {
      newOrder = "asc";
    }
    setSortOrder(newOrder);
    setSortColumn(column);
  };

  useEffect(() => {
    if (!firstEntry.current) {
      return;
    }

    const sorting: string = `${sortColumn}-${sortOrder}`;
    dispatch(setSort(sorting));
    dispatch(
      fetchRepositoriesAsync({
        query: GET_REPOSITIRIES,
        name: `${itemSearch}`,
        first: countItemsPage,
        sort: sorting,
      })
    );

    console.log(sorting);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder, sortColumn]);

  return (
    <TableHead>
      <TableRow>
        <TableCell width={"30%"}>Название</TableCell>
        <TableCell width={"17.5%"}>Язык</TableCell>
        <TableCell width={"17.5%"}>
          <TableSortLabel
            active={sortColumn === "forks"}
            direction={
              sortColumn === "forks" && sortOrder === "asc" ? "asc" : "desc"
            }
            onClick={() => handleSort("forks")}
          >
            Число форков
          </TableSortLabel>
        </TableCell>
        <TableCell width={"17.5%"}>
          <TableSortLabel
            active={sortColumn === "stars"}
            direction={
              sortColumn === "stars" && sortOrder === "asc" ? "asc" : "desc"
            }
            onClick={() => handleSort("stars")}
          >
            Число звезд
          </TableSortLabel>
        </TableCell>
        <TableCell width={"17.5%"}>
          <TableSortLabel
            active={sortColumn === "updated"}
            direction={
              sortColumn === "updated" && sortOrder === "asc" ? "asc" : "desc"
            }
            onClick={() => handleSort("updated")}
          >
            Дата обновления
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
