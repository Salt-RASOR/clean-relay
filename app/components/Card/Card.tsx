"use client";

import React from "react";
import Image from "next/image";
import { IssueGetResponse } from "@/app/common/interfaces";

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
  const isBeingFixed = statusId === 2;
  return (
    <div
      className="rounded-[21px] bg-card_bg py-4 px-8 relative my-6 w-1/3 min-w-[300px]"
      style={{ boxShadow: "0 1.72px 6.86px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="font-bold mb-2">{address}</div>
      <p className="mb-4">{categoryName}</p>
      <div className="flex justify-center">
        <Image src={imgUrl} alt={categoryName} width={200} height={150} />
      </div>
      <p className="text-sm mt-4">{userText}</p>
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
