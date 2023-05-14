import { createSlice } from "@reduxjs/toolkit";

import { ISelectedReposState } from "./typesRedux";

export const selectedReposSlice = createSlice({
  name: "selectedRepos",

  initialState: {
    selected: false,
    name: "",
    mainLang: "",
    countStars: 0,
    languages: [],
    license: "",
  } as ISelectedReposState,

  reducers: {
    setSelectedRepositiry: (
      state,
      action: {
        payload: {
          name: string;
          mainLang: string | null;
          countStars: number;
          languages: string[];
          license: string | null;
        };
      }
    ) => {
      state.selected = true;
      state.name = action.payload.name;
      state.mainLang = action.payload.mainLang;
      state.countStars = action.payload.countStars;
      state.languages = action.payload.languages;
      state.license = action.payload.license;
    },
  },
});

export const { setSelectedRepositiry } = selectedReposSlice.actions;

export default selectedReposSlice.reducer;
