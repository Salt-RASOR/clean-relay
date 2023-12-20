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

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userText = useAppSelector(selectNewDescription);
  const categoryId = useAppSelector(selectNewCategory);
  const imageFile = useAppSelector(selectNewImage);
  const { userLocation } = useLocation();

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

    dispatch(setProcessLink(0));
    await dispatch(createNewReportThunk(data));
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
