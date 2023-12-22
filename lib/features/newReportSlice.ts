import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createNewReport, getCategories } from "@/app/common/api";
import {
  Category,
  CategoryOption,
  IssuePostResponse,
} from "@/app/common/interfaces";
import { Status } from "@/app/common/constants";

export interface newReportState {
  categories: CategoryOption[];
  newCategory: number | null;
  newDescription: string;
  newImage: File | null;
  newImageURL: string;
  newData: IssuePostResponse | null;
  status: Status.Idle | Status.Loading | Status.Error;
}

const initialState: newReportState = {
  categories: [],
  newCategory: null,
  newDescription: "",
  newImage: null,
  newImageURL: "",
  newData: null,
  status: Status.Idle,
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

export const createNewReportThunk = createAsyncThunk(
  "newReport/createNewReport",
  async (formData: FormData) => {
    try {
      const attempt = await createNewReport(formData);
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

const handleLoading = (state: newReportState) => {
  state.status = Status.Loading;
};

export const newReportSlice = createSlice({
  name: "newReport",
  initialState,
  reducers: {
    setNewCategory: (state, action: PayloadAction<number>) => {
      state.newCategory = action.payload;
    },
    setNewDescription: (state, action: PayloadAction<string>) => {
      state.newDescription = action.payload;
    },
    setNewImage: (state, action: PayloadAction<File>) => {
      state.newImage = action.payload;
    },
    setNewImageURL: (state, action: PayloadAction<string>) => {
      state.newImageURL = action.payload;
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
} = newReportSlice.actions;
export default newReportSlice.reducer;
