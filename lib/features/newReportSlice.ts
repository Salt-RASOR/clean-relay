import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createNewReport } from "@/app/common/api";

const PROCESS_STEPS = ["/category", "/description", "/image"];

export interface newReportState {
  newCategory: number | null;
  newDescription: string;
  newImage: Blob | null;
  processLink: string;
}

const initialState: newReportState = {
  newCategory: null,
  newDescription: "",
  newImage: null,
  processLink: PROCESS_STEPS[0],
};

export const selectNewCategory = (state: RootState) =>
  state.newReport.newCategory;

export const selectNewDescription = (state: RootState) =>
  state.newReport.newDescription;

export const selectNewImage = (state: RootState) => state.newReport.newImage;

export const selectProcessLink = (state: RootState) =>
  state.newReport.processLink;

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
    setNewImage: (state, action: PayloadAction<Blob>) => {
      state.newImage = action.payload;
    },
    setProcessLink: (state, action: PayloadAction<number>) => {
      state.processLink = PROCESS_STEPS[action.payload];
    },
  },
});

export const {
  setNewCategory,
  setNewDescription,
  setNewImage,
  setProcessLink,
} = newReportSlice.actions;
export default newReportSlice.reducer;
