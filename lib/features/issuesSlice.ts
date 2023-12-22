import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Category,
  CategoryOption,
  IconData,
  IssueGetResponse,
  viewModes,
} from "../../app/common/interfaces";
import {
  getCategories,
  getIconImage,
  getIssues,
  getIssueById,
  changeTheStatus,
  deleteIssue,
} from "@/app/common/api";
import { RootState } from "../store";
import { Status, issuesIcons } from "@/app/common/constants";

export interface issuesState {
  categories: CategoryOption[];
  allIssues: IssueGetResponse[];
  issueById: IssueGetResponse | null;
  selectedIssueId: number | null;
  viewMode: viewModes;
  iconImages: IconData[];
  status: Status.Idle | Status.Loading | Status.Error;
  errorMessage: string;
}

const initialState: issuesState = {
  categories: [],
  allIssues: [],
  issueById: null,
  selectedIssueId: null,
  viewMode: 0,
  iconImages: [],
  status: Status.Idle,
  errorMessage: "",
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
  async (id: number) => {
    try {
      const response = await getIssueById(id.toString());
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
  async (id: number, { dispatch }) => {
    try {
      const response = await deleteIssue(id);
      if (response.status === 200) {
        return dispatch(getIssuesThunk());
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
export const selectAllIssues = (state: RootState) => state.issues.allIssues;
export const selectIconImages = (state: RootState) => state.issues.iconImages;
export const selectIssueById = (state: RootState) => state.issues.issueById;
export const selectSelectedIssueId = (state: RootState) =>
  state.issues.selectedIssueId;
export const selectViewMode = (state: RootState) => state.issues.viewMode;

export const selectStatus = (state: RootState) => {
  return state.issues.status;
};
const handleLoading = (state: issuesState) => {
  state.status = Status.Loading;
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setSelectedIssueId: (state, action: PayloadAction<number | null>) => {
      state.selectedIssueId = action.payload;
    },
    setViewMode: (state, action: PayloadAction<viewModes>) => {
      state.viewMode = action.payload;
    },
    setIssueById: (state, action: PayloadAction<IssueGetResponse | null>) => {
      state.issueById = action.payload;
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
      })
      .addCase(getIssuesThunk.fulfilled, (state, action) => {
        state.allIssues = action.payload;
        state.status = Status.Idle;
      })
      .addCase(getIconImagesThunk.fulfilled, (state, action) => {
        state.iconImages = action.payload;
      })
      .addCase(getIssueByIdThunk.fulfilled, (state, action) => {
        state.issueById = action.payload;
        state.status = Status.Idle;
      })
      .addCase(changeStatusThunk.fulfilled, (state, action) => {
        state.issueById = action.payload;
        state.status = Status.Idle;
      })
      .addCase(getIssuesThunk.pending, handleLoading)
      .addCase(changeStatusThunk.pending, handleLoading);
  },
});

export const { setSelectedIssueId, setViewMode, setIssueById } =
  issuesSlice.actions;
export default issuesSlice.reducer;
