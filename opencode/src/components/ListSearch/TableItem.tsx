import { TableRow, TableCell } from "@mui/material";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedRepositiry } from "../../redux/slice/SelectedReposSlice";
import { IRepositoryItem } from "../../redux/slice/typesRedux";

const TableItem: React.FC<IRepositoryItem> = ({
  id,
  name,
  mainLang,
  updateTime,
  countForks,
  countStars,
  license,
  languages,
}) => {
  const dispatch = useDispatch();

  const handlerClickItem = () => {
    console.log(`Клип по ${name}`);
    dispatch(
      setSelectedRepositiry({ name, mainLang, countStars, license, languages })
    );
  };

  const formattedDate: string = moment(updateTime).format("DD.MM.YYYY");

  return (
    <TableRow hover onClick={handlerClickItem}>
      <TableCell>{name}</TableCell>
      <TableCell>{mainLang ? mainLang : "-"}</TableCell>
      <TableCell>{countForks}</TableCell>
      <TableCell>{countStars}</TableCell>
      <TableCell>{formattedDate}</TableCell>
    </TableRow>
  );
};

export default TableItem;
