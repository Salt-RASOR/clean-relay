"use client";

import React from "react";
import "react-tabs/style/react-tabs.css";

import FileInput from "@/app/components/FileInput/FileInput";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import {
  createNewReportThunk,
  setProcessLink,
} from "@/lib/features/newReportSlice";

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const sendReport = () => {
    dispatch(setProcessLink(0));
    dispatch(createNewReportThunk);
    router.push("/new-report/done");
  };

  return (
    <div className="background-container bg-violet px-2">
      <FileInput />
      <Button
        clickHandler={sendReport}
        buttonText={"Send Report"}
        additionalClasses="mt-12"
      />
    </div>
  );
};

export default Page;
