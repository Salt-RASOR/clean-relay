"use client";

import { getFromLocalStorage } from "@/app/common/helpers";
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
    const localDescription = getFromLocalStorage("newDescription");
    const localCategory = getFromLocalStorage("newCategory");
    const userId = getFromLocalStorage("userId");

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
