"use client";
import React from "react";

import Card from "@/app/components/Card/Card";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectNewReportData } from "@/lib/features/newReportSlice";
import Confirmation from "@/app/components/Confirmation/Confirmation";
import { useRouter } from "next/navigation";
import { setSelectedIssueId } from "@/lib/features/issuesSlice";

const Page = () => {
  const newReport = useAppSelector(selectNewReportData);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const moveToIssue = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(setSelectedIssueId(newReport!.id));
    router.push("/issue");
  };

  return (
    <>
      <Confirmation text={"Your report has been submitted"}>
        {newReport && (
          <div className="mt-8 z-10">
            <Card {...newReport} onClick={moveToIssue} />
          </div>
        )}
      </Confirmation>
    </>
  );
};

export default Page;
