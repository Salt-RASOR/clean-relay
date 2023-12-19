import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface newIssueState {
  newCategoryId: number | null;
}

const initialState: newIssueState = {
  newCategoryId: null,
};

export const selectNewCategory = (state: RootState) =>
  state.newIssue.newCategoryId;

export const newIssueSlice = createSlice({
  name: "newIssue",
  initialState,
  reducers: {
    setNewCategory: (state, action: PayloadAction<number>) => {
      state.newCategoryId = action.payload;
    },
  },
});

export const { setNewCategory } = newIssueSlice.actions;
export default newIssueSlice.reducer;
