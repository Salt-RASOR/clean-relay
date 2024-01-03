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
  selectAllIssues,
  setIssueById,
  getIssuesThunk,
} from "@/lib/features/issuesSlice";
import Confirmation from "@/app/components/Confirmation/Confirmation";
import Loader from "@/app/components/Loader/Loader";
import SelectedCard from "../../components/Card/SelectedCard";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { selectUserId } from "@/lib/features/profileSlice";

const Page = () => {
  const { id } = useParams();

  const status = useAppSelector(selectStatus);
  const issueById = useAppSelector(selectIssueById);
  const issues = useAppSelector(selectAllIssues);
  const selectedIssueId = useAppSelector(selectSelectedIssueId) || Number(id);
  const userId = useAppSelector(selectUserId);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (selectedIssueId) {
      const issue = issues.find((issue) => issue.id === selectedIssueId);
      if (issue) {
        dispatch(setIssueById(issue));
      }

      dispatch(getIssueByIdThunk(selectedIssueId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          dispatch(deleteIssueThunk({ id: selectedIssueId, userId })).then(
            (result) => {
              if (!result.payload) {
                return toast("Cannot Remove Issue!", {
                  type: "error",
                });
              }

              dispatch(getIssuesThunk());
              router.push("/");
              statusText === StatusOptions.Completed
                ? toast("Issue Completed!", {
                    type: "success",
                  })
                : toast("Issue Deleted", {
                    type: "info",
                  });
            }
          );
          return;
        default:
          console.log("Invalid status option");
          return;
      }

      if (newStatus !== issueById.statusId) {
        dispatch(
          changeStatusThunk({ id: selectedIssueId, statusId: newStatus })
        );
        toast("Status Changed", { type: "success" });
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
