import Select, { StylesConfig } from "react-select";
import { Status } from "@/app/common/constants";
import {
  selectCategories,
  selectNewStatus,
  selectNewReportErrors,
} from "@/lib/features/newReportSlice";
import { useAppSelector } from "@/lib/hooks";

const CustomSelect = () => {
    const options = useAppSelector(selectCategories);
    const status = useAppSelector(selectNewStatus);
    const errors = useAppSelector(selectNewReportErrors);

    const customStyles: StylesConfig = {
        option: (
          defaultStyles: {},
          state: { isSelected: boolean; isFocused: boolean }
        ) => ({
          ...defaultStyles,
          color: "#343758",
          backgroundColor: state.isSelected ? "#eeeef7" : "#ffffff",
    
          "&:hover": {
            backgroundColor: "#eeeef7",
            cursor: "pointer",
          },
        }),
        control: (
          defaultStyles: {},
          state: { isSelected: boolean; isFocused: boolean }
        ) => ({
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
        multiValue: (styles) => ({
          ...styles,
          backgroundColor: "#eeeef7",
        }),
      };
    
      const isLoading = status === Status.Loading;
    
      const handleOption = (event: React.SyntheticEvent) => {
        // toDo implement
      };

      
  return (
    <>
    <span className="pl-2 text-[#818181]">Select the category</span>
      <Select
        defaultValue={null}
        onChange={handleOption}
        options={options}
        isLoading={isLoading}
        isMulti
        loadingMessage={() => "Loading..."}
        noOptionsMessage={() => "Loading..."}
        styles={customStyles}
      /></>
  )
}

export default CustomSelect