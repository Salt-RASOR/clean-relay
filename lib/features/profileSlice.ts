import { Coordinates } from "@/app/common/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface profileState {
  myLocation: Coordinates | null;
}

const initialState: profileState = {
  myLocation: null,
};

export const selectMyLocation = (state: RootState) => state.profile.myLocation;

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setMyLocation: (state, action: PayloadAction<Coordinates | null>) => {
      state.myLocation = action.payload;
    },
  },
});

export const { setMyLocation } = profileSlice.actions;
export default profileSlice.reducer;
