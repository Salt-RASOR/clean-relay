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
    if (clickHandler) {
      event.preventDefault();
      event.stopPropagation();
      clickHandler();
    }
  };

  return (
    <button
      className={`p-4 bg-primary_color text-white rounded-md ${additionalClasses}`}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
