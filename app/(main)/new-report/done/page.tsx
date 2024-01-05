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
    router.push(`/issue/${newReport!.id}`);
  };

  return (
    <>
      <Confirmation text={"Your report has been submitted"}>
        {newReport && (
         
            <Card {...newReport} onClick={moveToIssue} otherProps="scale-75 "/>
        
        )}
      </Confirmation>
    </>
  );
};

export default Page;
