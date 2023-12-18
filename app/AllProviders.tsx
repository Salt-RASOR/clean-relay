"use client";

import { FC, PropsWithChildren } from "react";
import StoreProvider from "./store/StoreProvider";

const AllProviders: FC<PropsWithChildren> = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default AllProviders;
