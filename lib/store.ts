import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./features/issuesSlice";
import profileReducer from "./features/profileSlice";
import newReportReducer from "./features/newReportSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      issues: issuesReducer,
      newReport: newReportReducer,
      profile: profileReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
