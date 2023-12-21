import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createNewReport } from "@/app/common/api";
import { IssuePostResponse } from "@/app/common/interfaces";

const PROCESS_STEPS = ["/information", "/image"];

export interface newReportState {
  newCategory: number | null;
  newDescription: string;
  newImage: File | null;
  newImageURL: string;
  newData: IssuePostResponse | null;
}

const initialState: newReportState = {
  newCategory: null,
  newDescription: "",
  newImage: null,
  newImageURL: "",
  newData: null,
};

export const selectNewCategory = (state: RootState) =>
  state.newReport.newCategory;

export const selectNewDescription = (state: RootState) =>
  state.newReport.newDescription;

export const selectNewImage = (state: RootState) => state.newReport.newImage;

export const selectNewImageURL = (state: RootState) =>
  state.newReport.newImageURL;

export const selectNewReportData = (state: RootState) =>
  state.newReport.newData;

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
      .addCase(createNewReportThunk.fulfilled, (state, action) => {
        state.newData = action.payload;
      })
      .addCase(createNewReportThunk.rejected, (state) => {
        state.newData = null;
      });
  },
});

export const {
  setNewCategory,
  setNewDescription,
  setNewImage,
  setNewImageURL,
} = newReportSlice.actions;
export default newReportSlice.reducer;
