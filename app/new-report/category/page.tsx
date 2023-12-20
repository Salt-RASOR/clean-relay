"use client";

import React from "react";
import Select, { SingleValue } from "react-select";
import Button from "@/app/components/Buttons/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCategories } from "@/lib/features/issuesSlice";
import {
  selectNewCategory,
  setNewCategory,
  setProcessLink,
} from "@/lib/features/newReportSlice";
import { CategoryOption } from "@/app/common/interfaces";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const options = useAppSelector(selectCategories);

  const selectedOption = useAppSelector(selectNewCategory);

  const selectCategory = () => {
    if (!selectedOption) {
      // error toast for not having an option selected here
      return;
    }

    dispatch(setProcessLink(1));
    router.push("/new-report/description");
  };

  const handleOption = (event: SingleValue<CategoryOption | null>) => {
    dispatch(setNewCategory(Number(event?.id)));
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
      <div className="grid grid-cols-2 gap-4 mb-8 text-primary_color">
        <h2 className="font-bold pb-6">Choose the Category</h2>
      </div>
      <div className="background-container bg-violet px-2 pt-20">
        <Select
          defaultValue={null}
          onChange={handleOption}
          options={options}
          styles={customStyles}
        />
        <Button
          buttonText={"Next"}
          clickHandler={selectCategory}
          additionalClasses="mt-12"
        />
      </div>
    </>
  );
};

export default Page;
