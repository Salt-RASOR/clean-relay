"use client";

import React, { useEffect } from "react";
import "react-tabs/style/react-tabs.css";

import FileInput from "@/app/components/Input/FileInput";
import Button from "@/app/components/Buttons/Button";
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
import useLocation from "@/app/hooks/useLocation";
import { getIssuesThunk } from "@/lib/features/issuesSlice";

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userText = useAppSelector(selectNewDescription);
  const categoryId = useAppSelector(selectNewCategory);
  const imageFile = useAppSelector(selectNewImage);
  const { userLocation } = useLocation();

  const setFile = async (files: File[]) => {
    if (!files || files.length === 0) {
      return;
    }

    dispatch(setNewImage(files[0]));
  };

  const sendReport = async (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!userText || !categoryId || !imageFile || !userLocation) {
      return;
    }

    const target = event.target as HTMLFormElement;
    const data = new FormData(target);

    data.append("userText", userText);
    data.append("categoryId", categoryId.toString());
    data.append("lat", userLocation.lat.toString());
    data.append("lng", userLocation.lng.toString());
    data.append("userId", "1");
    data.append("imageFile", imageFile);

    dispatch(createNewReportThunk(data))
      .then(() => {
        dispatch(setProcessLink(0));
        dispatch(getIssuesThunk());
        router.push("/new-report/done");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <form onSubmit={sendReport} className="background-container bg-violet px-2">
      <FileInput saveFile={setFile} />
      <Button buttonText={"Send Report"} additionalClasses="mt-12" />
    </form>
  );
};

export default Page;
