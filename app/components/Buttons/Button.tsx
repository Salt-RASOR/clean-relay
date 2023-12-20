import React from "react";

type ButtonProps = {
  buttonText: string;
  clickHandler?: () => void;
  additionalClasses?: string;
};
const Button: React.FC<ButtonProps> = ({
  buttonText,
  clickHandler,
  additionalClasses,
}) => {
  const handleClick = (event: React.SyntheticEvent) => {
    clickHandler && clickHandler();
  };

  return (
    <button
      className={`p-4 w-full bg-primary_color text-white rounded-md ${additionalClasses}`}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
