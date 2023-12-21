"use client";
import React, { useEffect } from "react";
import { StatusOptions, Status } from "@/app/common/constants";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  changeStatusThunk,
  getIssueByIdThunk,
  selectIssueById,
  deleteIssueThunk,
  selectStatus,
  selectSelectedIssueId,
  setSelectedIssueId,
} from "@/lib/features/issuesSlice";
import Confirmation from "@/app/components/Confirmation/Confirmation";
import Loader from "@/app/components/Loader/Loader";
import SelectedCard from "../components/Card/SelectedCard";

const Page = () => {
  const status = useAppSelector(selectStatus);
  const issueById = useAppSelector(selectIssueById);
  const selectedIssueId = useAppSelector(selectSelectedIssueId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedIssueId) {
      dispatch(getIssueByIdThunk(selectedIssueId));
    }
  }, [selectedIssueId, dispatch]);

  const handleOptionsClick = (statusText: string) => {
    let newStatus: number;

    if (selectedIssueId && issueById) {
      switch (statusText) {
        case StatusOptions.NotStarted:
          newStatus = 1;
          break;
        case StatusOptions.InProgress:
          newStatus = 2;
          break;
        case StatusOptions.Completed:
        case StatusOptions.Delete:
          dispatch(setSelectedIssueId(null));
          dispatch(deleteIssueThunk(selectedIssueId));
          return;
        default:
          console.log("Invalid status option");
          return;
      }

      if (newStatus !== issueById.statusId) {
        dispatch(
          changeStatusThunk({ id: selectedIssueId, statusId: newStatus })
        );
      } else {
        console.log("Nothing to change");
      }
    }
  };

  if (!selectedIssueId)
    return (
      <Confirmation
        text={"This issue has been solved"}
        additionalClass={"background-container bg-violet"}
      />
    );

  return (
    <>
      {status === Status.Loading && <Loader />}
      {issueById && (
        <SelectedCard {...issueById!} handleOptionsClick={handleOptionsClick} />
      )}
    </>
  );
};

export default Page;
