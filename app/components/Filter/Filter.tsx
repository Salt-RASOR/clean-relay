import { useState } from "react";
import clsx from "clsx";
import { CgMenuGridR } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

import CustomSelect from "./CustomSelect";
import CustomRange from "./CustomRange";

const Filter = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  return (
    <div className="my-6">
      <div
        id="accordion-flush"
        data-accordion="collapse"
        data-active-classes="bg-white relative text-gray-900 "
        data-inactive-classes="text-gray-500 ">
        <h2 id="accordion-flush-heading-1">
          <button
            type="button"
            className="flex items-center justify-end w-full py-5 font-medium rtl:text-right text-primary_color "
            data-accordion-target="#accordion-flush-body-1"
            onClick={toggleAccordion}
            aria-expanded="true"
            aria-controls="accordion-flush-body-1">
            {isAccordionOpen ? (
              <IoMdClose size={25} />
            ) : (
              <CgMenuGridR size={25} />
            )}
          </button>
        </h2>
        <div
          id="accordion-flush-body-1"
          className={isAccordionOpen ? "block" : "hidden"}
          aria-labelledby="accordion-flush-heading-1">
          <div
            className={clsx(
              "py-5 bg-white w-full p-6 border-b border-gray-200 absolute top-[75] right-0 pb-20 z-10 ",
              "md:px-28 xl:px-40 2xl:px-54"
            )}>
            <CustomSelect />
            <CustomRange />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
