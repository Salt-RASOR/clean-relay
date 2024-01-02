"use client";

import { Coordinates, SignUpData } from "@/app/common/interfaces";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Status, Roles } from "@/app/common/constants";
import { createNewProfile } from "@/app/common/api";

export interface ProfileErrors {
  emailError: boolean;
  passwordError: boolean;
  repeatPasswordError: boolean;
  loginEmailError: boolean;
  loginPasswordError: boolean;
}

export interface profileState {
  myLocation: Coordinates | null;
  userLoggedIn: boolean;
  userId: string;
  userRole: Roles | null;
  userPoints: number | null;
  status: Status;
  errors: ProfileErrors;
}

const initialState: profileState = {
  myLocation: null,
  userLoggedIn: false,
  userId: "",
  userRole: null,
  userPoints: null,
  status: Status.Idle,
  errors: {
    emailError: false,
    passwordError: false,
    repeatPasswordError: false,
    loginEmailError: false,
    loginPasswordError: false,
  },
};

export const selectMyLocation = (state: RootState) => state.profile.myLocation;
export const selectUserLoggedIn = (state: RootState) =>
  state.profile.userLoggedIn;
export const selectUserId = (state: RootState) => state.profile.userId;
export const selectUserRole = (state: RootState) => state.profile.userRole;
export const selectUserPoints = (state: RootState) => state.profile.userPoints;
export const selectProfileStatus = (state: RootState) => state.profile.status;
export const selectProfileErrors = (state: RootState) => state.profile.errors;

export const createNewProfileThunk = createAsyncThunk(
  "profile/createNewProfile",
  async ({ data, userId }: { data: SignUpData; userId: string }) => {
    try {
      const attempt = await createNewProfile(data, userId);
      return attempt;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

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
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
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
    setProfileErrors: (
      state,
      action: PayloadAction<{ key: keyof ProfileErrors; value: boolean }>
    ) => {
      state.errors[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewProfileThunk.fulfilled, (state, action) => {
      state.userId = action.payload.userId;
      state.userLoggedIn = true;
      state.userPoints = action.payload.points;
      state.userRole = action.payload.role;
    });
  },
});

export const {
  setMyLocation,
  setUserLoggedIn,
  setUserId,
  setUserRole,
  setUserPoints,
  setProfileStatus,
  setProfileErrors,
} = profileSlice.actions;
export default profileSlice.reducer;
