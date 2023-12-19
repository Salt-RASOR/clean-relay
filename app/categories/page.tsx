"use client";
import React, { useEffect, useState } from "react";
import Select, { SelectInstance } from "react-select";
import axios from "axios";
import Button from "../components/Button/Button";
import { Categori } from "../common/interfaces";

interface CustomStyles {
  option: (defaultStyles: any, state: any) => React.CSSProperties;
  control: (defaultStyles: any) => React.CSSProperties;
  // Add more style attributes as needed
}

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/categories`);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  const selectCategory = () => {
    // Todo: implement
  };

  const customStyles: StylesConfig = {
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

  const options = categories.map((category: Categori) => ({
    id: category.id,
    value: category.name,
    label: category.name,
  }));

  const handleOption = (selections: SelectInstance<(typeof options)[0], true>) => {
    setSelectedOption(selections);
  };

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
