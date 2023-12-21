"use client";
import React, { useEffect } from "react";
import clsx from "clsx";
import { StatusOptions, Status } from "@/app/common/constants";

import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  changeStatusThunk,
  getIssueByIdThunk,
  selectIssueById,
  deleteIssueThunk,
  selectStatus,
} from "@/lib/features/issuesSlice";
import CardHeader from "@/app/components/AdminCard/CardHeader";
import CardMain from "@/app/components/AdminCard/CardMain";
import Confirmation from "@/app/components/Confirmation/Confirmation";
import Loader from "@/app/components/Loader/Loader";

const Page = () => {
  const params = useParams();
  const status = useAppSelector(selectStatus);
  const issueById = useAppSelector(selectIssueById);
  const dispatch = useAppDispatch();

  useEffect(() => {
    params.id &&
      typeof params.id === "string" &&
      dispatch(getIssueByIdThunk(params.id));
  }, [params.id, dispatch]);

  const handleOptionsClick = (statusText: string) => {
    const id = Number(params.id);
    let newStatus: number;

    switch (statusText) {
      case StatusOptions.NotStarted:
        newStatus = 1;
        break;
      case StatusOptions.InProgress:
        newStatus = 2;
        break;
      case StatusOptions.Completed:
      case StatusOptions.Delete:
        dispatch(deleteIssueThunk(id));
        return;
      default:
        console.log("Invalid status option");
        return;
    }

    if (newStatus !== issueById.statusId) {
      dispatch(changeStatusThunk({ id, statusId: newStatus }));
    } else {
      console.log("Nothing to change");
    }
  };

  if (Object.keys(issueById).length === 0)
    return (
      <Confirmation
        text={"This issue has been solved"}
        additionalClass={"background-container bg-violet"}
      />
    );

  const isBeingFixed = issueById.statusId === 2;

  return (
    <>
      {status === Status.Loading && <Loader />}
      <div className="flex items-center justify-center gap-4 pt-20">
        <div
          className={clsx(
            "max-w-[400px]",
            "relative",
            "border border-solid border-stroke_color rounded-[20px]"
          )}>
          <div
            className={clsx(
              "w-[46px] h-[46px]",
              "top-0 left-0 absolute z-[-1]",
              "rounded-tl-[20px]"
            )}
            style={{
              background: `linear-gradient(to top left, #fff 0%, #fff ${
                isBeingFixed
                  ? "50%, #5AC29E 50%, #5AC29E 100%"
                  : "50%, #E20074 50%, #E20074 100%"
              })`,
            }}></div>

          <CardHeader
            statusText={issueById.statusText}
            id={issueById.id}
            statusId={issueById.statusId}
            handleOptionsClick={handleOptionsClick}
          />
          <CardMain
            categoryName={issueById.categoryName}
            userText={issueById.userText}
            imgUrl={issueById.imgUrl}
            address={issueById.address}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
