"use client";
import React from "react";

import Card from "@/app/components/Card/Card";
import { useAppSelector } from "@/lib/hooks";
import { selectNewReportData } from "@/lib/features/newReportSlice";
import Confirmation from "@/app/components/Confirmation/Confirmation";
const Page = () => {
  const newReport = useAppSelector(selectNewReportData);

  return (
   <Confirmation text={'Your report has been submitted'}>
    {newReport && (
          <div className="mt-8">
            <Card {...newReport} />
          </div>
        )}
   </Confirmation>
  );
};

export default Page;
