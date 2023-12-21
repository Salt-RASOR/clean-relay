"use client";

import React from "react";
import Select, { SingleValue } from "react-select";
import Button from "@/app/components/Buttons/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCategories } from "@/lib/features/issuesSlice";
import {
  selectNewCategory,
  setNewCategory,
  setNewDescription,
} from "@/lib/features/newReportSlice";
import { CategoryOption } from "@/app/common/interfaces";
import { useRouter } from "next/navigation";
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
      <div className="flex flex-col justify-center background-container bg-violet">
        <form onSubmit={saveDescription} className="px-2 md:px-10 lg:px-20">
          <h2 className="font-bold mb-12 text-primary_color text-center">
            Please provide some information
          </h2>

          <Select
            defaultValue={null}
            onChange={handleOption}
            options={options}
            styles={customStyles}
          />
          <TextArea />
          <Button buttonText={"Next"} additionalClasses="mt-12" />
        </form>
      </div>
    </>
  );
};

export default Page;
