"use client";
// import "react-tabs/style/react-tabs.css";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  createNewReportThunk,
  selectNewCategory,
  selectNewDescription,
  selectNewImage,
  selectNewStatus,
  setNewImage,
} from "@/lib/features/newReportSlice";
import { getIssuesThunk } from "@/lib/features/issuesSlice";
import useLocation from "@/app/hooks/useLocation";
import { Status } from "@/app/common/constants";
import FileInput from "@/app/components/Input/FileInput";
import Button from "@/app/components/Buttons/Button";
import Loader from "@/app/components/Loader/Loader";

const Page = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const status = useAppSelector(selectNewStatus);
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

    if (
      !userText ||
      !categoryId ||
      !imageFile ||
      !userLocation ||
      status === Status.Loading
    ) {
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
        dispatch(getIssuesThunk());
        router.push("/new-report/done");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      {status === Status.Loading && <Loader />}
      <form onSubmit={sendReport}>
        <FileInput saveFile={setFile} />
        <Button buttonText={"Send Report"} additionalClasses="mt-12" />
      </form>
    </>
  );
};

export default Page;
