import clsx from "clsx";
import React, { FC } from "react";

type TextAreaProps = {
  hasError: boolean;
  onChange: () => void;
  defaultValue: string;
};

const TextArea: FC<TextAreaProps> = ({ hasError, onChange, defaultValue }) => {
  return (
    <textarea
      defaultValue={defaultValue}
      onChange={onChange}
      className={clsx(
        "bg-violet_light rounded-md w-full p-8 mt-10 focus:outline-none focus:ring focus:ring-[#e4d9eb]",
        hasError && "outline outline-1 outline-red-500"
      )}
      name="details"
      id="details"
      rows={5}
      placeholder={
        "Describe the problem you see.\n\nWhat is the problem?\nWhere is it located?\nIs there anything noteworthy?\nAny other information you can think of?"
      }
    ></textarea>
  );
};

export default TextArea;
