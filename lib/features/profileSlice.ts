import { Coordinates } from "@/app/common/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Status, Roles } from "@/app/common/constants";

export interface profileState {
  myLocation: Coordinates | null;
  userLoggedIn: boolean;
  userRole: Roles | null;
  userPoints: number | null;
  status: Status;
}

const initialState: profileState = {
  myLocation: null,
  userLoggedIn: false,
  userRole: null,
  userPoints: null,
  status: Status.Idle,
};

export const selectMyLocation = (state: RootState) => state.profile.myLocation;
export const selectUserLoggedIn = (state: RootState) =>
  state.profile.userLoggedIn;
export const selectUserRole = (state: RootState) => state.profile.userRole;
export const selectUserPoints = (state: RootState) => state.profile.userPoints;
export const selectProfileStatus = (state: RootState) => state.profile.status;

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setMyLocation: (state, action: PayloadAction<Coordinates | null>) => {
      state.myLocation = action.payload;
    },
    setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.userLoggedIn = action.payload;
    },
    setUserRole: (state, action: PayloadAction<Roles | null>) => {
      state.userRole = action.payload;
    },
    setUserPoints: (state, action: PayloadAction<number | null>) => {
      state.userPoints = action.payload;
    },
    setProfileStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});

export const {
  setMyLocation,
  setUserLoggedIn,
  setUserRole,
  setUserPoints,
  setProfileStatus,
} = profileSlice.actions;
export default profileSlice.reducer;
