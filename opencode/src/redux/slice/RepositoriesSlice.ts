import { createSlice } from "@reduxjs/toolkit";
import { fetchRepositoriesAsync } from "../fetch/fetchRepositoriesAsync";
import { IRepositoriesState } from "./typesRedux";

export const repositoriesSlice = createSlice({
  name: "repositories",

  initialState: {
    data: [],
    loading: false,
    isError: false,
    isEmpty: false,
    error: "",
  } as IRepositoriesState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositoriesAsync.pending, (state) => {
        state.isEmpty = false;
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchRepositoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        if (action.payload.data.length === 0) {
          state.isEmpty = true;
        }
      })
      .addCase(fetchRepositoriesAsync.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default repositoriesSlice.reducer;
