import React from "react";

type ButtonProps = {
  buttonText: string;
  clickHandler: () => void;
};
const Button: React.FC<ButtonProps> = ({ buttonText, clickHandler }) => {
  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    clickHandler && clickHandler();
  };
  return (
    <button
      className="p-4 w-full bg-primary_color text-white rounded-md"
      onClick={handleClick}>
      {buttonText}
    </button>
  );
};

export default Button;
