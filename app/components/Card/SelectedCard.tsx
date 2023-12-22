"use client";

import React from "react";
import { IssueGetResponse } from "@/app/common/interfaces";
import CardHeader from "../AdminCard/CardHeader";
import CardMain from "../AdminCard/CardMain";
import clsx from "clsx";

export interface SelectedCardProps extends IssueGetResponse {
  handleOptionsClick: (text: string) => void;
}

const SelectedCard: React.FC<SelectedCardProps> = ({
  id,
  address,
  imgUrl,
  categoryName,
  statusText,
  statusId,
  userText,
  handleOptionsClick,
}) => {
  const isBeingFixed = statusId === 2;

  return (
    <div className="flex items-center justify-center gap-4 pt-20">
      <div
      style={{ boxShadow: "0 1.72px 6.86px rgba(0, 0, 0, 0.25)" }}
        className={clsx(
          "max-w-[400px] bg-card_bg z-[-1]",
          "relative",
          "border border-solid border-stroke_color rounded-[20px]"
        )}
      >
        <div
          className={clsx(
            "w-[46px] h-[46px]",
            "top-0 left-0 absolute z-[-1]",
            "rounded-tl-[20px]"
          )}
          style={{
            background: `linear-gradient(to top left, #f4f4f4 0%, #f4f4f4 ${
              isBeingFixed
                ? "50%, #5AC29E 50%, #5AC29E 100%"
                : "50%, #E20074 50%, #E20074 100%"
            })`,
          }}
        ></div>

        <CardHeader
          statusText={statusText}
          id={id}
          statusId={statusId}
          handleOptionsClick={handleOptionsClick}
        />
        <CardMain
          categoryName={categoryName}
          userText={userText}
          imgUrl={imgUrl}
          address={address}
        />
      </div>
    </div>
  );
};

export default SelectedCard;
