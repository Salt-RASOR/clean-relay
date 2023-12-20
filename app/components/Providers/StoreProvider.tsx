"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";
import {
  getCategoriesThunk,
  getIconImagesThunk,
  getIssuesThunk,
} from "@/lib/features/issuesSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();

    // Initial queries here
    storeRef.current.dispatch(getCategoriesThunk());
    storeRef.current.dispatch(getIssuesThunk());
    storeRef.current.dispatch(getIconImagesThunk());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}