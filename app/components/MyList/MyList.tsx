import React, { useEffect } from "react";
import MyIssue from "./MyIssue";
import NoResults from "../NoResults/NoResults";
import {
  getIssueByUserThunk,
  selectUserIssues,
} from "@/lib/features/issuesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectUserEmail, selectUserId } from "@/lib/features/profileSlice";
import generateAuthData from "@/app/utils/generateAuthData";

const MyList = () => {
  const userIssues = useAppSelector(selectUserIssues);
  const currentUserEmail = useAppSelector(selectUserEmail);
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  const getUserIssues = async () => {
    const authData = await generateAuthData(userId, currentUserEmail as string);
    dispatch(getIssueByUserThunk({userId, authData}));
  };
  
  useEffect(() => {
    getUserIssues();
  }, []);

  return (
    <>
      {!userIssues && <NoResults />}
      {userIssues.map((issue) => (
        <MyIssue
          key={issue.id}
          categoryId={issue.categoryId}
          statusId={issue.statusId}
          adress={issue.address}
          imgUrl={issue.imgUrl}
        />
      ))}
    </>
  );
};

export default MyList;
