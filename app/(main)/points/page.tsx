"use client";

import React from "react";
import clsx from "clsx";
import {
  selectUserPoints,
  selectUserLoggedIn,
  selectProfileStatus,
} from "@/lib/features/profileSlice";
import { useAppSelector } from "@/lib/hooks";
import { Status } from "@/app/common/constants";
import Loader from "@/app/components/Loader/Loader";
import Points from "@/app/components/Points/Points";
import AuthVerifier from "@/app/components/AuthVerifier/AuthVerifier";

const Page = () => {
  const userLoggedIn = useAppSelector(selectUserLoggedIn);
  const pointsBalance = useAppSelector(selectUserPoints);
  const status = useAppSelector(selectProfileStatus);

  return (
    <div
      className={clsx(
        "px-4",
        "flex flex-col justify-center items-center",
        "background-container bg-violet"
      )}
    >
      {status === Status.Loading && <Loader />}
      {userLoggedIn ? (
        <Points pointsBalance={pointsBalance} />
      ) : (
        <AuthVerifier />
      )}
    </div>
  );
};

export default Page;
