import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthData,
  IconData,
  IssueGetResponse,
  viewModes,
} from "../../app/common/interfaces";
import {
  getIconImage,
  getIssues,
  getIssueById,
  changeTheStatus,
  deleteIssue,
  getIssuesByUser,
  completeIssue,
} from "@/app/common/api";
import { RootState } from "../store";
import { Status, issuesIcons } from "@/app/common/constants";

export interface issuesState {
  allIssues: IssueGetResponse[];
  userIssues: IssueGetResponse[];
  issueById: IssueGetResponse | null;
  selectedIssueId: number | null;
  viewMode: viewModes;
  iconImages: IconData[];
  filterCategories: number[];
  filterRange: number;
  status: Status;
}

const initialState: issuesState = {
  allIssues: [],
  userIssues: [],
  issueById: null,
  selectedIssueId: null,
  viewMode: 0,
  iconImages: [],
  filterCategories: [],
  filterRange: 0,
  status: Status.Idle,
};

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

export const getIssueByUserThunk = createAsyncThunk(
  "issues/getIssueByUser",
  async ({ userId, authData }: { userId: string; authData: AuthData }) => {
    try {
      const response = await getIssuesByUser(userId, authData);
      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const changeStatusThunk = createAsyncThunk(
  "issues/changeStatus",
  async ({
    id,
    statusId,
    authData,
  }: {
    id: number;
    statusId: number;
    authData: AuthData;
  }) => {
    try {
      const response = await changeTheStatus({
        id: id.toString(),
        statusId,
        authData,
      });
      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const deleteIssueThunk = createAsyncThunk(
  "issues/deleteIssue",
  async ({ id, authData }: { id: number; authData: AuthData }) => {
    try {
      await deleteIssue(id, authData);
      return { id };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
);

export const completeIssueThunk = createAsyncThunk(
  "issues/completeIssue",
  async ({ id, authData }: { id: number; authData: AuthData }) => {
    try {
      await completeIssue(id, authData);
      return { id };
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

export const selectAllIssues = (state: RootState) => state.issues.allIssues;
export const selectUserIssues = (state: RootState) => state.issues.userIssues;
export const selectIconImages = (state: RootState) => state.issues.iconImages;
export const selectIssueById = (state: RootState) => state.issues.issueById;
export const selectSelectedIssueId = (state: RootState) =>
  state.issues.selectedIssueId;
export const selectViewMode = (state: RootState) => state.issues.viewMode;
export const selectFilterCategories = (state: RootState) =>
  state.issues.filterCategories;
export const selectFilterRange = (state: RootState) => state.issues.filterRange;
export const selectStatus = (state: RootState) => {
  return state.issues.status;
};

const handleLoading = (state: issuesState) => {
  state.status = Status.Loading;
};

const handleError = (state: issuesState) => {
  state.status = Status.Error;
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
      .addCase(getIssuesThunk.fulfilled, (state, action) => {
        state.allIssues = action.payload;
        state.status = Status.Idle;
      })
      .addCase(getIssueByUserThunk.fulfilled, (state, action) => {
        state.userIssues = action.payload;
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

        const issue = state.allIssues.find(
          (issue) => issue.id === action.payload.id
        );

        if (issue) {
          issue.statusId = action.payload.statusId;
        }

        state.status = Status.Idle;
      })
      .addCase(deleteIssueThunk.fulfilled, (state, action) => {
        state.allIssues.filter((issue) => issue.id !== action.payload!.id);
        state.status = Status.Idle;
      })
      .addCase(completeIssueThunk.fulfilled, (state, action) => {
        state.allIssues.filter((issue) => issue.id !== action.payload!.id);
        state.status = Status.Idle;
      })
      .addCase(getIssuesThunk.pending, handleLoading)
      .addCase(getIssueByUserThunk.pending, handleLoading)
      .addCase(deleteIssueThunk.pending, handleLoading)
      .addCase(completeIssueThunk.pending, handleLoading)
      .addCase(changeStatusThunk.pending, handleLoading)

      .addCase(getIssuesThunk.rejected, handleError)
      .addCase(getIssueByUserThunk.rejected, handleError)
      .addCase(deleteIssueThunk.rejected, handleError)
      .addCase(completeIssueThunk.rejected, handleError)
      .addCase(changeStatusThunk.rejected, handleError);
  },
});

export const { setSelectedIssueId, setViewMode, setIssueById } =
  issuesSlice.actions;
export default issuesSlice.reducer;
