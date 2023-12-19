import { createSlice } from "@reduxjs/toolkit";
import { Category, CategoryOption } from "../../app/common/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "@/app/common/api";
import { RootState } from "../store";

export interface issuesState {
  categories: CategoryOption[];
  categoriesLoaded: boolean;
}

const initialState: issuesState = {
  categories: [],
  categoriesLoaded: false,
};

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

export const selectCategories = (state: RootState) => state.issues.categories;
export const selectCategoriesLoaded = (state: RootState) =>
  state.issues.categoriesLoaded;

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.pending, (state) => {
        state.categoriesLoaded = false;
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.categoriesLoaded = true;
        state.categories = action.payload.map((category: Category) => {
          return {
            id: category.id,
            value: category.name,
            label: category.name,
          };
        });
      });
  },
});

export default issuesSlice.reducer;
