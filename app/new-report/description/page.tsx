"use client";

import React from "react";
import "react-tabs/style/react-tabs.css";

import Button from "@/app/components/Button/Button";
import TextArea from "@/app/components/TextArea";
import { useRouter } from "next/navigation";
import {
  setNewDescription,
  setProcessLink,
} from "@/lib/features/newReportSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const saveDescription = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const data = new FormData(target);

    dispatch(setNewDescription(data.get("details") as string));
    dispatch(setProcessLink(2));
    router.push("/new-report/image");
  };

  return (
    <form
      onSubmit={saveDescription}
      className="background-container bg-violet px-2"
    >
      <TextArea />
      <Button buttonText={"Next"} additionalClasses="mt-12" />
    </form>
  );
};

export default Page;
