import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "./issueSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    issue: issueReducer,
    profile: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
