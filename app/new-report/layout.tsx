"use client";

import {
  setNewCategory,
  setNewDescription,
} from "@/lib/features/newReportSlice";
import { useAppDispatch } from "@/lib/hooks";
import { FC, PropsWithChildren, useEffect } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localDescription = localStorage.getItem("newDescription");
    const localCategory = localStorage.getItem("newCategory");

    if (localDescription) {
      dispatch(setNewDescription(localDescription));
    }

    if (localCategory) {
      dispatch(setNewCategory(Number(localCategory)));
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center background-container bg-violet">
      {children}
    </div>
  );
};

export default Layout;
