import React, { useEffect, useCallback } from "react";
import MyIssue from "./MyIssue";
import NoResults from "../NoResults/NoResults";
import {
  deleteIssueThunk,
  getIssueByUserThunk,
  getIssuesThunk,
  selectUserIssues,
} from "@/lib/features/issuesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectUserEmail, selectUserId } from "@/lib/features/profileSlice";
import generateAuthData from "@/app/utils/generateAuthData";
import { toast } from "react-toastify";

const MyList = () => {
  const userIssues = useAppSelector(selectUserIssues);
  const currentUserEmail = useAppSelector(selectUserEmail);
  const userId = useAppSelector(selectUserId);

  const dispatch = useAppDispatch();

  const getUserIssues = async () => {
    const authData = await generateAuthData(userId, currentUserEmail as string);
    dispatch(getIssueByUserThunk({ userId, authData }));
  };

  const deleteIssue = async (selectedIssueId: number) => {
    const authData = await generateAuthData(userId, currentUserEmail as string);
    dispatch(deleteIssueThunk({ id: selectedIssueId, authData })).then(
      (result) => {
        if (!result.payload) {
          return toast("Cannot Delete Issue!", {
            type: "error",
            toastId: "deleteError",
          });
        }

        dispatch(getIssuesThunk());

        toast("Issue Deleted", {
          type: "info",
          toastId: "deleteSuccess",
        });
      }
    );
  };

  const deleteIssueCallback = useCallback(deleteIssue, []); 

  useEffect(() => {
    getUserIssues();
  }, [deleteIssueCallback]);

  return (
    <>
      {userIssues.length === 0 && <NoResults />}
      {userIssues.map((issue) => (
        <MyIssue
          key={issue.id}
          issueId={issue.id}
          categoryId={issue.categoryId}
          statusId={issue.statusId}
          adress={issue.address}
          imgUrl={issue.imgUrl}
          handleDelete={deleteIssue}
        />
      ))}
    </>
  );
};

export default MyList;

