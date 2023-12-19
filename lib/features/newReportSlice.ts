import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const PROCESS_STEPS = ["/category", "/description", "/image"];

export interface newReportState {
  newCategory: number | null;
  newDescription: string;
  processLink: string;
}

const initialState: newReportState = {
  newCategory: null,
  newDescription: "",
  processLink: PROCESS_STEPS[0],
};

export const selectNewCategory = (state: RootState) =>
  state.newReport.newCategory;

export const selectNewDescription = (state: RootState) =>
  state.newReport.newDescription;

export const selectProcessLink = (state: RootState) =>
  state.newReport.processLink;

export const createNewReportThunk = createAsyncThunk(
  "newReport/createNewReport",
  async () => {
    try {
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
      console.log("saved");
      state.newDescription = action.payload;
    },
    setProcessLink: (state, action: PayloadAction<number>) => {
      state.processLink = PROCESS_STEPS[action.payload];
    },
  },
});

export const { setNewCategory, setNewDescription, setProcessLink } =
  newReportSlice.actions;
export default newReportSlice.reducer;
