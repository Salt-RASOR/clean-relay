"use client";

import React from "react";
import Image from "next/image";
import { IssueGetResponse } from "@/app/common/interfaces";
import getIssueIcon from "@/app/utils/getIssueIcon";
import { useAppSelector } from "@/lib/hooks";
import { selectIconImages } from "@/lib/features/issuesSlice";

export interface CardProps extends IssueGetResponse {}

const Card: React.FC<CardProps> = ({
  address,
  imgUrl,
  categoryId,
  categoryName,
  statusText,
  statusId,
  userText,
}) => {
  const iconList = useAppSelector(selectIconImages);
  const categoryIconUrl = getIssueIcon(iconList, categoryId, statusId);

  const isBeingFixed = statusId === 2;

  return (
    <div
      className="col-span-1 rounded-[21px] bg-card_bg py-4 px-6 relative my-2"
      style={{ boxShadow: "0 1.72px 6.86px rgba(0, 0, 0, 0.25)" }}
    >
      <p className="font-bold mb-2 truncate">{address}</p>
      <div className="flex justify-left items-center mb-4">
        <Image
          src={categoryIconUrl}
          alt={categoryName}
          width={50}
          height={50}
        />
        <p className="font-bold ml-6">{categoryName}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-around sm:justify-between mb-2 sm:h-[100px] h-[240px]">
        <Image
          src={imgUrl}
          alt={""}
          quality={50}
          width={200}
          height={100}
          className="object-cover w-full sm:w-1/2 max-h-36"
        />
        <p className="w-full sm:w-1/2 text-left text-sm mt-4 sm:mt-0 pb-4 sm:pb-0 sm:ml-4 overflow-hidden text-ellipsis">
          {userText}
        </p>
      </div>
      <div
        className="w-[46px] h-[46px] bg-red-500 bottom-0 right-0 absolute rounded-br-lg"
        style={{
          background: `linear-gradient(to bottom right, #f4f4f4 0%, #f4f4f4 ${
            isBeingFixed
              ? "50%, #5AC29E 50%, #5AC29E 100%"
              : "50%, #E20074 50%, #E20074 100%"
          })`,
        }}
      ></div>
    </div>
  );
};

export default Card;
