import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createNewReport, getCategories } from "@/app/common/api";
import {
  AuthData,
  Category,
  CategoryOption,
  IssuePostResponse,
} from "@/app/common/interfaces";
import { Status } from "@/app/common/constants";
import { setUserId } from "./profileSlice";

export interface NewReportErrors {
  categoryError: boolean;
  descriptionError: boolean;
  imageError: boolean;
}

export interface NewReportState {
  categories: CategoryOption[];
  newCategory: number | null;
  newDescription: string;
  newImage: File | null;
  newImageURL: string;
  newData: IssuePostResponse | null;
  status: Status;
  errors: NewReportErrors;
}

const initialState: NewReportState = {
  categories: [],
  newCategory: null,
  newDescription: "",
  newImage: null,
  newImageURL: "",
  newData: null,
  status: Status.Idle,
  errors: { categoryError: false, descriptionError: false, imageError: false },
};

export const selectCategories = (state: RootState) =>
  state.newReport.categories;

export const selectNewCategory = (state: RootState) =>
  state.newReport.newCategory;

export const selectNewDescription = (state: RootState) =>
  state.newReport.newDescription;

export const selectNewImage = (state: RootState) => state.newReport.newImage;

export const selectNewImageURL = (state: RootState) =>
  state.newReport.newImageURL;

export const selectNewReportData = (state: RootState) =>
  state.newReport.newData;

export const selectNewStatus = (state: RootState) => state.newReport.status;

export const selectNewReportErrors = (state: RootState) =>
  state.newReport.errors;

export const createNewReportThunk = createAsyncThunk(
  "newReport/createNewReport",
  async (
    { formData, authData }: { formData: FormData; authData: AuthData },
    { dispatch }
  ) => {
    try {
      const attempt = await createNewReport(formData, authData);
      dispatch(setUserId(attempt.userId));
      return attempt;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const getCategoriesThunk = createAsyncThunk(
  "issues/getCategories",
  async () => {
    try {
      const response = await getCategories();
      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

const handleLoading = (state: NewReportState) => {
  state.status = Status.Loading;
};

export const newReportSlice = createSlice({
  name: "newReport",
  initialState,
  reducers: {
    setNewCategory: (state, action: PayloadAction<number | null>) => {
      state.newCategory = action.payload;
    },
    setNewDescription: (state, action: PayloadAction<string>) => {
      state.newDescription = action.payload;
    },
    setNewImage: (state, action: PayloadAction<File | null>) => {
      state.newImage = action.payload;
    },
    setNewImageURL: (state, action: PayloadAction<string>) => {
      state.newImageURL = action.payload;
    },
    setNewReportErrors: (
      state,
      action: PayloadAction<{ key: keyof NewReportErrors; value: boolean }>
    ) => {
      state.errors[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.categories = action.payload.map((category: Category) => {
          return {
            id: category.id,
            value: category.name,
            label: category.name,
          };
        });
        state.status = Status.Idle;
      })
      .addCase(createNewReportThunk.fulfilled, (state, action) => {
        state.newData = action.payload;
        state.status = Status.Idle;
      })
      .addCase(createNewReportThunk.rejected, (state) => {
        state.newData = null;
        state.status = Status.Error;
      })
      .addCase(getCategoriesThunk.pending, handleLoading)
      .addCase(createNewReportThunk.pending, handleLoading);
  },
});

export const {
  setNewCategory,
  setNewDescription,
  setNewImage,
  setNewImageURL,
  setNewReportErrors,
} = newReportSlice.actions;
export default newReportSlice.reducer;
