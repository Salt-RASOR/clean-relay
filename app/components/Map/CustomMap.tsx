"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  selectAllIssues,
  selectIconImages,
  setSelectedIssueId,
} from "@/lib/features/issuesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import useLocation from "@/app/hooks/useLocation";
import getIssueIcon from "@/app/utils/getIssueIcon";
import Loader from "../Loader/Loader";

const center = {
  // central Stockholm
  lat: 59.334591,
  lng: 18.06324,
};

const CustomMap = () => {
  const router = useRouter();
  const { userLocation } = useLocation();

  const issues = useAppSelector(selectAllIssues);
  const iconImages = useAppSelector(selectIconImages);

  const dispatch = useAppDispatch();

  const { isLoaded } = useJsApiLoader({
    id: "google-Custommap-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  const containerStyle = {
    width: "auto",
    // wont autoadjust until a reload, but fits nicely
    // 300 is a guesstimate of top and bottom bars' height
    height: (window.innerHeight - 300).toString() + "px",
  };

  const handleMarkerClick = (id: string) => {
    dispatch(setSelectedIssueId(Number(id)));
    router.push(`/issue`);
  };
  return (
    <>
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation || center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              streetViewControl: false,
              mapTypeControlOptions: { mapTypeIds: [] },
            }}
          >
            {issues.map((issue) => {
              const iconId = issue.categoryId;
              const statusId = issue.statusId;

              const url = getIssueIcon(iconImages, iconId, statusId);

              return (
                <Marker
                  onClick={() => handleMarkerClick(issue.id.toString())}
                  key={issue.id}
                  position={{ lat: issue.lat, lng: issue.lng }}
                  icon={{
                    url: url,
                  }}
                />
              );
            })}
          </GoogleMap>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default React.memo(CustomMap);

export const dynamic = "force-dynamic";
