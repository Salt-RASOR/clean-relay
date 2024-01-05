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
  setNewCategory,
  setNewDescription,
  setNewImage,
  setNewReportErrors,
} from "@/lib/features/newReportSlice";
import { getIssuesThunk, selectStatus } from "@/lib/features/issuesSlice";
import { Status } from "@/app/common/constants";
import FileInput from "@/app/components/Input/FileInput";
import Button from "@/app/components/Buttons/Button";
import Loader from "@/app/components/Loader/Loader";
import {
  selectMyLocation,
  selectUserEmail,
  selectUserId,
} from "@/lib/features/profileSlice";
import { toast } from "react-toastify";
import clsx from "clsx";
import generateAuthData from "@/app/utils/generateAuthData";

const Page = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const status = useAppSelector(selectNewStatus);
  const statusIssues = useAppSelector(selectStatus);

  const userText = useAppSelector(selectNewDescription);
  const categoryId = useAppSelector(selectNewCategory);
  const imageFile = useAppSelector(selectNewImage);
  const myLocation = useAppSelector(selectMyLocation);
  const errors = useAppSelector(selectNewReportErrors);

  const userId = useAppSelector(selectUserId);
  const email = useAppSelector(selectUserEmail);

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

    if (!myLocation) {
      toast("Please Allow Access to Your Location", {
        type: "error",
        toastId: "locationError",
      });
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
    data.append("userId", userId);
    data.append("imageFile", imageFile);

    const authData = await generateAuthData(userId, email);
    dispatch(createNewReportThunk({ formData: data, authData })).then(
      (result) => {
        if (!result.payload) {
          return toast("Failed to Create New Report", {
            type: "error",
            toastId: "newReportError",
          });
        }

        toast("New Report Created", {
          type: "success",
          toastId: "newReportSuccess",
        });

        dispatch(setNewDescription(""));
        dispatch(setNewCategory(null));
        dispatch(setNewImage(null));

        localStorage.removeItem("newDescription");
        localStorage.removeItem("newCategory");

        dispatch(getIssuesThunk());
        router.push("/new-report/done");
      }
    );
  };

  return (
    <div className="px-4">
      {status === Status.Loading && <Loader />}
      <form onSubmit={sendReport}>
        <FileInput saveFile={setFile} hasError={errors.imageError} />
        <Button
          buttonText={"Send Report"}
          additionalClasses={clsx(
            "w-full",
            status === Status.Loading ||
              statusIssues === Status.Loading ||
              categoryId === null
              ? "disabled bg-slate-300 "
              : "" + "mt-12"
          )}
        />
      </form>
    </div>
  );
};

export default Page;
