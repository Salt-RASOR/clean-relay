"use client";

import React from "react";
import "react-tabs/style/react-tabs.css";

import FileInput from "@/app/components/FileInput/FileInput";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  createNewReportThunk,
  selectNewCategory,
  selectNewDescription,
  selectNewImage,
  setNewImage,
  setProcessLink,
} from "@/lib/features/newReportSlice";

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userText = useAppSelector(selectNewDescription);
  const categoryId = useAppSelector(selectNewCategory);
  const imageFile = useAppSelector(selectNewImage);

  const setFile = async (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (!files) {
      return;
    }

    const arrayBuffer = await files[0].arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    dispatch(setNewImage(blob));
  };

  const sendReport = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!userText || !categoryId || !imageFile) {
      return;
    }

    const target = event.target as HTMLFormElement;
    const data = new FormData(target);

    data.append("userText", userText);
    data.append("categoryId", categoryId.toString());
    data.append("lat", "1");
    data.append("lng", "1");
    data.append("userId", "1");
    data.append("imageFile", imageFile);

    console.log(data);
    dispatch(setProcessLink(0));
    dispatch(createNewReportThunk(data));
    router.push("/new-report/done");
  };

  return (
    <form onSubmit={sendReport} className="background-container bg-violet px-2">
      <FileInput onChange={setFile} />
      <Button buttonText={"Send Report"} additionalClasses="mt-12" />
    </form>
  );
};

export default Page;
