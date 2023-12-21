"use client";
import React, { useEffect } from "react";
import clsx from "clsx";

import Image from "next/image";

import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { getIssueByIdThunk, selectIssueById } from "@/lib/features/issuesSlice";
import CardHeader from "@/app/components/AdminCard/CardHeader";
import CardMain from "@/app/components/AdminCard/CardMain";

const Page = () => {
  const params = useParams();
  const issueById = useAppSelector(selectIssueById);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof params.id === "string") {
      dispatch(getIssueByIdThunk(params.id));
    }
  }, []);

  const handleOptionsClick = () => {
    // ToDo implement the  status changing
  };

  if (Object.keys(issueById).length === 0) return <p>Loading...</p>;

  const isBeingFixed = issueById.statusId === 2;

  return (
    <>
      <div className="flex items-center justify-center gap-4">
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
