"use client";

import React from "react";
import Image from "next/image";
import { IssueGetResponse } from "@/app/common/interfaces";
import getIssueIcon from "@/app/utils/getIssueIcon";
import { useAppSelector } from "@/lib/hooks";
import { selectIconImages } from "@/lib/features/issuesSlice";

import { RiPinDistanceLine } from "react-icons/ri";
import { GiMatterStates } from "react-icons/gi";

export interface CardProps extends IssueGetResponse {
  onClick?: (event: React.MouseEvent) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  address,
  imgUrl,
  categoryId,
  categoryName,
  statusId,
  userText,
  onClick,
}) => {
  const iconList = useAppSelector(selectIconImages);
  const categoryIconUrl = getIssueIcon(iconList, categoryId, statusId);

  const isBeingFixed = statusId === 2;

  return (
    <div
      className=" max-w-[400px] rounded-[10px] bg-card_bg py-6 px-4 my-2 cursor-pointer"
      style={{ boxShadow: "0 1.72px 6.86px rgba(0, 0, 0, 0.25)" }}
      onClick={onClick}
      id={id.toString()}>
      <div className="flex justify-left items-center mb-4">
        <Image
          src={categoryIconUrl}
          alt={categoryName}
          width={30}
          height={30}
        />
        <p className="font-bold ml-6">{categoryName}</p>
      </div>

      <div className="flex justify-between text-slate-600 italic">

        <p className="flex items-center gap-2">
          <GiMatterStates /> <span>In progress</span>
        </p>
        <p className="flex items-center gap-2">
          <RiPinDistanceLine /> <span> 60 km</span>
        </p>
      </div>
     
        <Image
          src={imgUrl}
          alt={""}
          quality={50}
          width={300}
          height={200}
          className="object-cover w-full my-4"
        />
        <p className="font-semibold my-4 truncate">{address}</p>
        <p className="overflow-hidden text-ellipsis mt-4">
          {userText}
        </p>
     
    </div>
  );
};

export default Card;
