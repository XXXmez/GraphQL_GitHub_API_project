import { createSlice } from "@reduxjs/toolkit";
import { fetchRepositoriesAsync } from "../fetch/fetchRepositoriesAsync";
import { ISettingsState } from "./typesRedux";

export const settingSlice = createSlice({
  name: "settings",

  initialState: {
    countItemsPerPage: 10,
    itemSearch: "",
    repositoryCount: 0,
    pageInfo: {},
    sort: "",
    paginationPage: 0,
  } as ISettingsState,

  reducers: {
    setCountItemsPerPage: (state, action: { payload: number }) => {
      state.countItemsPerPage = action.payload;
    },
    setItemSearch: (state, action: { payload: string }) => {
      state.itemSearch = action.payload;
    },
    setSort: (state, action: { payload: string }) => {
      state.sort = action.payload;
    },
    setPaginationPage: (state, action: { payload: number }) => {
      state.paginationPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositoriesAsync.fulfilled, (state, action) => {
        state.repositoryCount = action.payload.repositoryCount;
        state.itemSearch = action.meta.arg.name;
        state.pageInfo = action.payload.pageInfo;
        console.log("эффект", action);
      })
      .addCase(fetchRepositoriesAsync.rejected, (state) => {
        state.paginationPage = 0;
      });
  },
});

export const {
  setCountItemsPerPage,
  setItemSearch,
  setSort,
  setPaginationPage,
} = settingSlice.actions;

export default settingSlice.reducer;
