import selectedReposSlice from "./slice/SelectedReposSlice";
import { configureStore } from "@reduxjs/toolkit";

import settingSlice from "./slice/SettingsSlice";
import repositoriesSlice from "./slice/RepositoriesSlice";

export const store = configureStore({
  reducer: {
    repositories: repositoriesSlice,
    settings: settingSlice,
    selectedRepos: selectedReposSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
