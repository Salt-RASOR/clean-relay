import { shangeStatusOptions } from "@/app/common/constants";
import clsx from "clsx";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../Modal/Modal";
import useHandleModal from "@/app/hooks/useHandleModal";
import Image from 'next/image'
import getIssueIcon from "@/app/utils/getIssueIcon";
import { selectIconImages } from "@/lib/features/issuesSlice";
import { useAppSelector } from "@/lib/hooks";

type CardHeaderProps = {
  statusText: string | undefined;
  id: number | undefined;
  statusId: number;
  categoryId: number;
  categoryName: string
  handleOptionsClick: (statusText: string) => void;
};
const CardHeader: React.FC<CardHeaderProps> = ({
  handleOptionsClick,
  categoryId, 
  categoryName,
  statusId,
}) => {
  const { handleModalShow, showModal, handleModalClose } = useHandleModal();

  const optionClick = (optionName: string) => {
    handleOptionsClick && handleOptionsClick(optionName);
    handleModalClose();
  };
  const iconList = useAppSelector(selectIconImages);
  const categoryIconUrl = getIssueIcon(iconList, categoryId, statusId);

  return (
    <header
    className="flex justify-between items-center mb-4 relative"
    >
   
      <div className="flex justify-left items-center mb-4">
        <Image
          src={categoryIconUrl}
          alt={categoryName}
          width={30}
          height={30}
        />
        <p className="font-bold ml-6">{categoryName}</p>
      </div>
      <button
        onClick={handleModalShow}
        type="button"
        className={clsx(
          "px-3 py-2",
          "rounded-lg",
          "focus:ring-4 focus:outline-none focus:ring-violet_hover"
        )}
      >
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
              key={idx}
            >
              <span>{option.icon}</span> <span>{option.title}</span>
            </button>
          ))}
        </div>
      </Modal>
    </header>
  );
};

export default CardHeader;
