"use client";

import {
  setNewCategory,
  setNewDescription,
} from "@/lib/features/newReportSlice";
import { setUserId } from "@/lib/features/profileSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { useEffect } from "react";

const LocalStorage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localDescription = localStorage.getItem("newDescription");
    const localCategory = localStorage.getItem("newCategory");
    const userId = localStorage.getItem("userId");

    if (localDescription) {
      dispatch(setNewDescription(localDescription));
    }

    if (localCategory) {
      dispatch(setNewCategory(Number(localCategory)));
    }

    if (userId) {
      dispatch(setUserId(userId));
    }
  }, [dispatch]);

  return <></>;
};

export default LocalStorage;
