"use client";
// import "react-tabs/style/react-tabs.css";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  createNewReportThunk,
  selectNewCategory,
  selectNewDescription,
  selectNewImage,
  selectNewReportErrors,
  selectNewStatus,
  setNewImage,
  setNewReportErrors,
} from "@/lib/features/newReportSlice";
import { getIssuesThunk } from "@/lib/features/issuesSlice";
import { Status } from "@/app/common/constants";
import FileInput from "@/app/components/Input/FileInput";
import Button from "@/app/components/Buttons/Button";
import Loader from "@/app/components/Loader/Loader";
import { selectMyLocation } from "@/lib/features/profileSlice";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const status = useAppSelector(selectNewStatus);
  const userText = useAppSelector(selectNewDescription);
  const categoryId = useAppSelector(selectNewCategory);
  const imageFile = useAppSelector(selectNewImage);
  const myLocation = useAppSelector(selectMyLocation);
  const errors = useAppSelector(selectNewReportErrors);

  const setFile = async (files: File[]) => {
    if (!files || files.length === 0) {
      return;
    }

    if (errors.imageError) {
      dispatch(setNewReportErrors({ key: "imageError", value: false }));
    }

    dispatch(setNewImage(files[0]));
  };

  const sendReport = async (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!imageFile) {
      dispatch(setNewReportErrors({ key: "imageError", value: true }));
      toast("Missing Image", { type: "error", toastId: "imageError" });
    }

    if (
      !userText ||
      !categoryId ||
      !imageFile ||
      !myLocation ||
      status === Status.Loading
    ) {
      return;
    }

    const target = event.target as HTMLFormElement;
    const data = new FormData(target);

    data.append("userText", userText);
    data.append("categoryId", categoryId.toString());
    data.append("lat", myLocation.lat.toString());
    data.append("lng", myLocation.lng.toString());
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
    <div className="px-4">
      {status === Status.Loading && <Loader />}
      <form onSubmit={sendReport}>
        <FileInput saveFile={setFile} hasError={errors.imageError} />
        <Button buttonText={"Send Report"} additionalClasses="mt-12" />
      </form>
    </div>
  );
};

export default Page;
