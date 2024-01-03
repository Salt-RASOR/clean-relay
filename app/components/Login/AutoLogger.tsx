"use client";

import { autoLoginThunk } from "@/lib/features/profileSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { useEffect } from "react";

const AutoLogger = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(autoLoginThunk());
  }, [dispatch]);

  return <></>;
};

export default AutoLogger;
