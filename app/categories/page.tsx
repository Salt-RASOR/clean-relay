"use client";
import React, { useEffect, useState } from "react";
import Select, { SelectInstance, SingleValue } from "react-select";
import Button from "../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import {
  getCategoriesThunk,
  selectCategories,
} from "../../lib/features/issuesSlice";
import { setNewCategory } from "../../lib/features/newIssueSlice";
import { CategoryOption } from "../common/interfaces";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const selectCategory = () => {
    // Todo: implement
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategoriesThunk);
  }, [dispatch]);

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: "primary_color",
      backgroundColor: state.isSelected ? "#eeeef7" : "#ffffff",
      "&:hover": {
        backgroundColor: "#eeeef7",
        cursor: "pointer",
      },
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      padding: "10px",
      border: "none",
      boxShadow: "none",
    }),
  };

  const handleOption = (event: SingleValue<CategoryOption | null>) => {
    dispatch(setNewCategory(Number(event?.id)));
  };

  const options = useAppSelector(selectCategories);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-8 text-primary_color">
        <h2 className="font-bold pb-6">Choose the Category</h2>
      </div>
      <div className="background-container bg-violet px-2 pt-20">
        <Select
          defaultValue={selectedOption}
          onChange={handleOption}
          options={options}
          styles={customStyles}
        />
        <Button
          buttonText={"Choose the category"}
          clickHandler={selectCategory}
          additionalClasses="mt-12"
        />
      </div>
    </>
  );
};

export default Page;
