import { createSlice } from "@reduxjs/toolkit";

export interface profileState {}

const initialState: profileState = {};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
});

export default profileSlice.reducer;
