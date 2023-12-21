import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Category,
  CategoryOption,
  IconData,
  IssueGetResponse,
} from "../../app/common/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategories,
  getIconImage,
  getIssues,
  getIssueById,
  changeTheStatus,
  deleteIssue,
} from "@/app/common/api";
import { RootState } from "../store";
import { issuesIcons } from "@/app/common/constants";

export interface issuesState {
  categories: CategoryOption[];
  categoriesLoaded: boolean;
  allIssues: IssueGetResponse[];
  issueById: Partial<IssueGetResponse>;
  selectedIssueId: number | null;
  viewMode: 0 | 1 | 2;
  iconImages: IconData[];
}

const initialState: issuesState = {
  categories: [],
  categoriesLoaded: false,
  allIssues: [],
  issueById: {},
  selectedIssueId: null,
  viewMode: 0,
  iconImages: [],
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

export const getIssuesThunk = createAsyncThunk("issues/getIssues", async () => {
  try {
    const response = await getIssues();
    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
});

export const getIssueByIdThunk = createAsyncThunk(
  "issues/getIssueById",
  async (id: string) => {
    try {
      const response = await getIssueById(id);
      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const changeStatusThunk = createAsyncThunk(
  "issues/changeStatus",
  async ({ id, statusId }: { id: number; statusId: number }) => {

    try {
      const response = await changeTheStatus(id.toString(), statusId);
      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const deleteIssueThunk = createAsyncThunk(
  "issues/deleteIssue",
  async (id: number) => {
    try {
      const response = await deleteIssue(id);
      if (response.status === 200) {
        return {};
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);
export const getIconImagesThunk = createAsyncThunk(
  "issues/getIconImages",
  async () => {
    try {
      const icons = issuesIcons.map((icon) => {
        return {
          id: icon.id,
          value: icon.value,
          url: icon.icon.src,
        } as IconData;
      });

      (
        await Promise.all(
          icons.map((icon) => {
            return getIconImage(icon.url);
          })
        )
      ).forEach((text, index) => {
        icons[index].svgString = text;
      });

      return icons;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const selectCategories = (state: RootState) => state.issues.categories;
export const selectCategoriesLoaded = (state: RootState) =>
  state.issues.categoriesLoaded;
export const selectAllIssues = (state: RootState) => state.issues.allIssues;
export const selectIconImages = (state: RootState) => state.issues.iconImages;
export const selectIssueById = (state: RootState) => state.issues.issueById;
export const selectSelectedIssue = (state: RootState) =>
  state.issues.selectedIssueId;
export const selectViewMode = (state: RootState) => state.issues.viewMode;

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setSelectedIssue: (state, action: PayloadAction<number>) => {
      state.selectedIssueId = action.payload;
    },
    setViewMode: (state, action: PayloadAction<0 | 1 | 2>) => {
      state.viewMode = action.payload;
    },
  },
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
      })
      .addCase(getIssuesThunk.fulfilled, (state, action) => {
        state.allIssues = action.payload;
      })
      .addCase(getIconImagesThunk.fulfilled, (state, action) => {
        state.iconImages = action.payload;
      })
      .addCase(getIssueByIdThunk.fulfilled, (state, action) => {
        state.issueById = action.payload;
      })
      .addCase(changeStatusThunk.fulfilled, (state, action) => {
        state.issueById = action.payload;
      });
  },
});

export const { setSelectedIssue, setViewMode } = issuesSlice.actions;
export default issuesSlice.reducer;
