"use client";
import React from "react";
import clsx from "clsx";
import Points from "../components/Points/Points";
import AuthVerifier from "../components/AuthVerifier/AuthVerifier";
import {
  selectUserPoints,
  selectUserLoggedIn,
} from "@/lib/features/profileSlice";
import { useAppSelector } from "@/lib/hooks";

const Page = () => {
  const userLoggedIn = useAppSelector(selectUserLoggedIn);
  const pointsBalance = useAppSelector(selectUserPoints);

  return (
    <div
      className={clsx(
        "px-4",
        "flex flex-col justify-center items-center",
        "background-container bg-violet"
      )}>
      {userLoggedIn ? (
        <Points pointsBalance={pointsBalance} />
      ) : (
        <AuthVerifier />
      )}
    </div>
  );
};

export default Page;
