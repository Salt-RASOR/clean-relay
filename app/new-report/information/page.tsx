"use client";
import React, { useId } from "react";
import Select, { SingleValue } from "react-select";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectCategories,
  selectNewDescription,
  selectNewReportErrors,
  setNewReportErrors,
} from "@/lib/features/newReportSlice";
import {
  selectNewCategory,
  selectNewStatus,
  setNewCategory,
  setNewDescription,
} from "@/lib/features/newReportSlice";
import { CategoryOption } from "@/app/common/interfaces";
import Button from "@/app/components/Buttons/Button";
import TextArea from "@/app/components/Input/TextArea";
import { Status } from "@/app/common/constants";
import { toast } from "react-toastify";
import { saveToLocalStorage } from "@/app/utils/localStorage";

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const options = useAppSelector(selectCategories);
  const selectedOption = useAppSelector(selectNewCategory);
  const status = useAppSelector(selectNewStatus);
  const newDescription = useAppSelector(selectNewDescription);

  const errors = useAppSelector(selectNewReportErrors);

  const handleOption = (event: SingleValue<CategoryOption | null>) => {
    dispatch(setNewCategory(Number(event?.id)));

    if (errors.categoryError) {
      dispatch(setNewReportErrors({ key: "categoryError", value: false }));
    }
  };

  const updateDescriptionInput = () => {
    if (errors.descriptionError) {
      dispatch(setNewReportErrors({ key: "descriptionError", value: false }));
    }
  };

  const saveInformation = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!selectedOption) {
      dispatch(setNewReportErrors({ key: "categoryError", value: true }));
      toast("Missing Category", { type: "error", toastId: "categoryError" });
    }

    const target = event.target as HTMLFormElement;
    const data = new FormData(target);
    const description = data.get("details") as string;

    if (!description) {
      dispatch(setNewReportErrors({ key: "descriptionError", value: true }));
      toast("Missing Description", {
        type: "error",
        toastId: "descriptionError",
      });
    }

    if (!description || !selectedOption) {
      return;
    }

    dispatch(setNewDescription(description));

    saveToLocalStorage("newDescription", description);
    saveToLocalStorage("newCategory", selectedOption.toString());

    router.push("/new-report/image");
  };

  const customStyles = {
    option: (defaultStyles: {}, state: { isSelected: boolean }) => ({
      ...defaultStyles,
      color: "#343758",

      backgroundColor: state.isSelected ? "#eeeef7" : "#ffffff",
      "&:hover": {
        backgroundColor: "#eeeef7",
        cursor: "pointer",
      },
    }),
    control: (defaultStyles: {}, state: { isFocused: boolean }) => ({
      ...defaultStyles,
      padding: "10px",
      border: "none",
      boxShadow: "none",
      outline: errors.categoryError ? "1px solid red" : "2px solid #e4d9eb",
    }),
  };

  const isLoading = status === Status.Loading;

  return (
    <div className="px-4 w-full md:w-7/12">
      <form onSubmit={saveInformation}>
        <h1 className="font-bold mb-10 text-primary_color text-center text-lg">
          Please, provide some information
        </h1>

        <Select
          value={selectedOption ? options[selectedOption - 1] : null}
          onChange={handleOption}
          options={options}
          isLoading={isLoading}
          loadingMessage={() => "Loading..."}
          noOptionsMessage={() => "Loading..."}
          styles={customStyles}
          placeholder="Select Category"
          instanceId={useId()}
        />
        <TextArea
          defaultValue={newDescription}
          hasError={errors.descriptionError}
          onChange={updateDescriptionInput}
        />
        <Button buttonText={"Next"} additionalClasses="mt-10 w-full" />
      </form>
    </div>
  );
};

export default Page;
