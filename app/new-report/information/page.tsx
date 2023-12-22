"use client";
import React from "react";
import Select, { SingleValue } from "react-select";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCategories } from "@/lib/features/issuesSlice";
import {
  selectNewCategory,
  setNewCategory,
  setNewDescription,
} from "@/lib/features/newReportSlice";
import { CategoryOption } from "@/app/common/interfaces";
import Button from "@/app/components/Buttons/Button";
import TextArea from "@/app/components/Input/TextArea";

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const options = useAppSelector(selectCategories);
  const selectedOption = useAppSelector(selectNewCategory);

  const handleOption = (event: SingleValue<CategoryOption | null>) => {
    dispatch(setNewCategory(Number(event?.id)));
  };

  const saveDescription = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!selectedOption) {
      // error toast for not having an option here
      return;
    }

    const target = event.target as HTMLFormElement;
    const data = new FormData(target);
    const description = data.get("details") as string;

    if (!description) {
      // error toast for not having a description here
      return;
    }

    dispatch(setNewDescription(description));
    router.push("/new-report/image");
  };

  const customStyles = {
    option: (defaultStyles: {}, state: { isSelected: boolean }) => ({
      ...defaultStyles,
      color: "primary_color",
      backgroundColor: state.isSelected ? "#eeeef7" : "#ffffff",
      "&:hover": {
        backgroundColor: "#eeeef7",
        cursor: "pointer",
      },
    }),
    control: (defaultStyles: {}) => ({
      ...defaultStyles,
      padding: "10px",
      border: "none",
      boxShadow: "none",
    }),
  };

  return (
    <>
      <form onSubmit={saveDescription}>
        <h2 className="font-bold mb-10 text-primary_color text-center">
          Please provide some information
        </h2>

        <Select
          defaultValue={null}
          onChange={handleOption}
          options={options}
          styles={customStyles}
        />
        <TextArea />
        <Button buttonText={"Next"} additionalClasses="mt-10" />
      </form>
    </>
  );
};

export default Page;
