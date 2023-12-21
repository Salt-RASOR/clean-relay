import { StatusOptions, shangeStatusOptions } from "@/app/common/constants";
import clsx from "clsx";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../Modal/Modal";
import useHandleModal from "@/app/hooks/useHandleModal";

type CardHeaderProps = {
  statusText: string | undefined;
  id: number | undefined;
  statusId: number | undefined;
  handleOptionsClick: (statusText: string) => void;
};
const CardHeader: React.FC<CardHeaderProps> = ({
  statusText,
  handleOptionsClick,
}) => {
  const { handleModalShow, showModal, handleModalClose } = useHandleModal();

  const optionClick = (optionName: string) => {
   
    handleOptionsClick && handleOptionsClick(optionName);
    handleModalClose()
  };
  return (
    <header
      className={clsx(
        "border-b border-stroke_color",
        "relative  p-4",
        "flex items-center justify-between"
      )}>
      <p>
        <span className="font-bold pl-2">Status: </span>
        {statusText}
      </p>
      <button
        onClick={handleModalShow}
        type="button"
        className={clsx(
          "px-3 py-2",
          "rounded-lg",
          "focus:ring-4 focus:outline-none focus:ring-violet_hover"
        )}>
        <BsThreeDotsVertical />
      </button>
      <Modal showModal={showModal} handleModalClose={handleModalClose}>
        <div className="p-4 mt-4 flex flex-col min-w-[200px] text-primary_color">
          {shangeStatusOptions.map((option, idx) => (
            <button
              onClick={() => optionClick(option.title)}
              className={clsx(
                "px-3 py-4",
                "rounded-lg",
                "flex items-center  gap-4",
                "focus:ring-4 focus:outline-none focus:ring-violet_hover hover:bg-violet_hover"
              )}
              key={idx}>
              <span>{option.icon}</span> <span>{option.title}</span>
            </button>
          ))}
        </div>
      </Modal>
    </header>
  );
};

export default CardHeader;
