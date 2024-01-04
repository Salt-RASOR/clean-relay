"use client";

import Select, { MultiValue } from "react-select";
import { Status } from "@/app/common/constants";

import {
  selectCategories,
  selectNewStatus,
  selectNewReportErrors,
} from "@/lib/features/newReportSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CategoryOption } from "@/app/common/interfaces";
import { setFilterCategories } from "@/lib/features/issuesSlice";
import { useId } from "react";

const CustomSelect = () => {
  const options = useAppSelector(selectCategories);
  const status = useAppSelector(selectNewStatus);
  const errors = useAppSelector(selectNewReportErrors);

  const dispatch = useAppDispatch();

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
      padding: "6px",
      borderRadius: "10px",
      outline: errors.categoryError ? "2px solid red" : "",
      border: state.isFocused ? "1px solid #cccccc" : "1px solid #cccccc",
      boxShadow: state.isFocused ? "0px 0px 6px #eeeef7" : "none",
      "&:hover": {
        border: "1px solid #cccccc",
        boxShadow: "0px 0px 6px #eeeef7",
      },
    }),
    multiValue: (provided: object) => ({
      ...provided,
      backgroundColor: "#eeeef7",
    }),
  };

  const isLoading = status === Status.Loading;

  const handleOption = (event: MultiValue<CategoryOption | null>) => {
    const values = event
      .filter((object) => object)
      .map((object) => Number(object!.id));
    dispatch(setFilterCategories(values));
  };

  return (
    <>
      <span className="text-[#818181]">Filter by category</span>
      <Select
        defaultValue={null}
        onChange={handleOption}
        options={options}
        isLoading={isLoading}
        isMulti
        loadingMessage={() => "Loading..."}
        noOptionsMessage={() => "Loading..."}
        styles={customStyles}
        instanceId={useId()}
      />
    </>
  );
};

export default CustomSelect;
