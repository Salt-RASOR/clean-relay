"use client";

import React from "react";
import clsx from "clsx";
import Points from "../components/Points/Points";
import AuthVerifier from "../components/AuthVerifier/AuthVerifier";
import {
  selectUserPoints,
  selectUserLoggedIn,
  selectProfileStatus,
} from "@/lib/features/profileSlice";
import { useAppSelector } from "@/lib/hooks";
import Loader from "../components/Loader/Loader";
import { Status } from "../common/constants";

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
