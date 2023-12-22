import React from "react";

const TextArea = () => {
  return (
    <textarea
      className="bg-violet_light rounded-md w-full p-8 mt-10"
      name="details"
      id="details"
      rows={5}
      placeholder={
        "Describe the problem you see. \n\nWhat is the problem? \nWhere is it located?\n Is there anything noteworthy?\n Any other information you can think of?"
      }
    ></textarea>
  );
};

export default TextArea;
