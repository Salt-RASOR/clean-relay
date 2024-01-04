"use client";
import {
  Coordinates,
  SignUpData,
  CredentialData,
  AuthData,
} from "@/app/common/interfaces";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Status, Roles } from "@/app/common/constants";
import {
  addPoints,
  createNewProfile,
  deleteProfile,
  getProfileData,
  updateUserCredentials,
} from "@/app/common/api";
import { saveToLocalStorage } from "@/app/common/helpers";
import generateAuthData from "@/app/utils/generateAuthData";

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
  userEmail: string;
  userName: string;
  userPhone: string;
  userPoints: number | null;
  status: Status;
  errors: ProfileErrors;
}

const initialState: profileState = {
  myLocation: null,
  userLoggedIn: false,
  userId: "",
  userRole: null,
  userEmail: "",
  userName: "",
  userPhone: "",
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
export const selectUserEmail = (state: RootState) => state.profile.userEmail;
export const selectUserName = (state: RootState) => state.profile.userName;
export const selectUserPhome = (state: RootState) => state.profile.userPhone;
export const selectStatus = (state: RootState) => {
  return state.profile.status;
};

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

export const getProfileDataThunk = createAsyncThunk(
  "profile/getProfileData",
  async (authData: AuthData) => {
    try {
      const attempt = await getProfileData(authData);
      return attempt;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const updateUserCredentialsThunk = createAsyncThunk(
  "profile/updateUserCredentials",
  async ({ data, authData }: { data: CredentialData; authData: AuthData }) => {
    try {
      const response = await updateUserCredentials(data, authData);
      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const autoLoginThunk = createAsyncThunk(
  "profile/autoLogin",
  async (undefined, { dispatch }) => {
    try {
      const authData = await generateAuthData("", "", true);

      return dispatch(getProfileDataThunk(authData));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const deleteProfileThunk = createAsyncThunk(
  "profile/deleteProfile",
  async (authData: AuthData, { dispatch }) => {
    try {
      await deleteProfile(authData);
      return dispatch(logoutUser());
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const addPointsThunk = createAsyncThunk(
  "profile/addPoints",
  async ({ points, authData }: { points: number; authData: AuthData }) => {
    try {
      const response = await addPoints(points, authData);
      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

const handleLoading = (state: profileState) => {
  state.status = Status.Loading;
};

const handleError = (state: profileState) => {
  state.status = Status.Error;
};

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
      saveToLocalStorage("userId", action.payload);
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
    logoutUser: (state) => {
      state.userLoggedIn = false;
      state.userId = "";
      state.userEmail = "";
      state.userName = "";
      state.userPoints = null;
      state.userRole = null;
      state.userPhone = "";

      saveToLocalStorage("userId", "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewProfileThunk.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.userLoggedIn = true;
        state.userPoints = action.payload.points;
        state.userRole = action.payload.roleId;
        state.userEmail = action.payload.email;
        state.status = Status.Idle;
        saveToLocalStorage("userId", action.payload.userId);
      })
      .addCase(getProfileDataThunk.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.userLoggedIn = true;
        state.userPoints = action.payload.points;
        state.userRole = action.payload.roleId;
        state.userEmail = action.payload.email;
        state.userPhone = action.payload.phone;
        state.userName = action.payload.name;
        state.status = Status.Idle;
        saveToLocalStorage("userId", action.payload.userId);
      })
      .addCase(updateUserCredentialsThunk.fulfilled, (state, action) => {
        state.userEmail = action.payload.email;
        state.userPhone = action.payload.phone;
        state.userName = action.payload.name;
        state.userRole = action.payload.roleId;
        state.status = Status.Idle;
      })
      .addCase(addPointsThunk.fulfilled, (state, action) => {
        state.userPoints = action.payload.points;
      })
      .addCase(getProfileDataThunk.pending, handleLoading)
      .addCase(createNewProfileThunk.pending, handleLoading)
      .addCase(updateUserCredentialsThunk.pending, handleLoading)

      .addCase(getProfileDataThunk.rejected, handleError)
      .addCase(createNewProfileThunk.rejected, handleError)
      .addCase(updateUserCredentialsThunk.rejected, handleError);
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
  logoutUser,
} = profileSlice.actions;
export default profileSlice.reducer;
