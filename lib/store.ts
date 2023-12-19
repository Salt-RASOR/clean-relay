import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./features/issuesSlice";
import profileReducer from "./features/profileSlice";
import newIssueReducer from "./features/newIssueSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      issues: issuesReducer,
      newIssue: newIssueReducer,
      profile: profileReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
