"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { IssueGetResponse } from "@/app/common/interfaces";
import getIssueIcon from "@/app/utils/getIssueIcon";
import { useAppSelector } from "@/lib/hooks";
import { selectIconImages } from "@/lib/features/issuesSlice";

import { GiMatterStates } from "react-icons/gi";
import Distance from "../Location/Distance";
import { selectMyLocation } from "@/lib/features/profileSlice";

export interface CardProps extends IssueGetResponse {
  onClick?: (event: React.MouseEvent) => void;
  otherProps?: string;
}

const Card: React.FC<CardProps> = ({
  id,
  address,
  imgUrl,
  categoryId,
  categoryName,
  statusId,
  statusText,
  userText,
  lat,
  lng,
  onClick,
  otherProps,
}) => {
  const myLocation = useAppSelector(selectMyLocation);
  const iconList = useAppSelector(selectIconImages);
  const categoryIconUrl = getIssueIcon(iconList, categoryId, statusId);

  return (
    <div
      className={clsx(
        " max-w-[400px] rounded-[10px] bg-card_bg py-6 px-4 my-2 cursor-pointer",
        otherProps
      )}
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
          <GiMatterStates /> <span>{statusText}</span>
        </p>
        <Distance myLocation={myLocation} otherLocation={{ lat, lng }} />
      </div>

      <Image
        src={imgUrl}
        alt={""}
        quality={50}
        width={300}
        height={200}
        className="object-cover w-full my-4 h-[200px]"
      />
      <p className="font-semibold my-4 truncate">{address}</p>
      <p className="mt-4 truncate">{userText}</p>
    </div>
  );
};

export default Card;
