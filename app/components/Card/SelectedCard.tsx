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
  categoryId,
  lat,
  lng,
  handleOptionsClick,
}) => {
  return (
    <div className="flex items-center justify-center p-4 mt-20">
      <div
        className={clsx(
          " py-6 px-4 my-2",
          "rounded-[10px] bg-card_bg max-w-[600px]"
        )}
        style={{ boxShadow: "0 1.72px 6.86px rgba(0, 0, 0, 0.25)" }}
      >
        <CardHeader
          statusText={statusText}
          id={id}
          statusId={statusId}
          handleOptionsClick={handleOptionsClick}
          categoryId={categoryId}
          categoryName={categoryName}
        />
        <CardMain
          statusText={statusText}
          lat={lat}
          lng={lng}
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
