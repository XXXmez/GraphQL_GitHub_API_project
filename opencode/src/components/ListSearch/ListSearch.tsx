import React from "react";
import { Box, Typography } from "@mui/material";
import { Table, TableBody, TableContainer } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { RepositoriesData } from "../../redux/slice/typesRedux";
import TableHeader from "./TableHeader";
import TableItem from "./TableItem";
import ClipLoader from "react-spinners/ClipLoader";

import s from "./ListSearch.module.css";

const ListSearch: React.FC = () => {
  const loadingRepositories: boolean = useSelector(
    (state: RootState) => state.repositories.loading
  );
  const data: RepositoriesData = useSelector(
    (state: RootState) => state.repositories.data
  );

  return (
    <div className={s.box}>
      <Box display={"flex"} alignItems="center" gap="10px">
        <Typography sx={{ fontSize: "48px" }}>Результаты поиска</Typography>
        {loadingRepositories && (
          <Box>
            <ClipLoader />
          </Box>
        )}
      </Box>

      <TableContainer sx={{ marginBottom: "52px" }}>
        <Table>
          <TableHeader />

          <TableBody>
            {data.length > 0 &&
              data.map((item) => (
                <TableItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  mainLang={item.mainLang}
                  updateTime={item.updateTime}
                  countForks={item.countForks}
                  countStars={item.countStars}
                  license={item.license}
                  languages={item.languages}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListSearch;
