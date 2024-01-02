import React from "react";
import clsx from "clsx";

type CustomInputProps = {
  label: string;
  forwardedRef: React.RefObject<HTMLInputElement>;
  hasError: boolean;
  inputType: string;
  defaultValue?: string;
  onChange?: () => void;
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  forwardedRef,
  inputType,
  hasError,
  onChange,
  defaultValue,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-[#818181]"
      >
        {label}
      </label>
      <input
        className={clsx(
          "bg-gray-50 border border-stroke_color rounded-md",
          "w-full px-4 py-2",
          "text-gray-900 text-sm",
          "focus:outline-none focus:ring focus:ring-[#e4d9eb]",
          hasError && "outline outline-1 outline-red-500"
        )}
        ref={forwardedRef}
        id={label}
        type={inputType}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;
