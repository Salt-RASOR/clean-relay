"use client";

import useLocation from "@/app/hooks/useLocation";
import { setMyLocation } from "@/lib/features/profileSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";

const LocationPrompter = () => {
  const { userLocation } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMyLocation(userLocation));
  }, [dispatch, userLocation]);

  return <></>;
};

export default LocationPrompter;
