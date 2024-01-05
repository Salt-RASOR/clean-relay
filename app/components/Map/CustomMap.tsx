"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  selectIconImages,
  setSelectedIssueId,
} from "@/lib/features/issuesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import getIssueIcon from "@/app/utils/getIssueIcon";
import Loader from "../Loader/Loader";
import { selectMyLocation } from "@/lib/features/profileSlice";
import { IssueGetResponse } from "@/app/common/interfaces";
import { selectMapPin, setMapPin } from "@/lib/features/newReportSlice";

const center = {
  // central Stockholm
  lat: 59.334591,
  lng: 18.06324,
};

const containerStyle = {
  width: "auto",
  height: "calc(100vh - 320px)",
};

export interface CustomMapProps {
  issues?: IssueGetResponse[];
  pinnable?: boolean;
}

const CustomMap: FC<CustomMapProps> = ({ issues = [], pinnable = false }) => {
  const router = useRouter();

  const iconImages = useAppSelector(selectIconImages);
  const myLocation = useAppSelector(selectMyLocation);
  const pin = useAppSelector(selectMapPin);

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

  const handleMarkerClick = (id: string) => {
    dispatch(setSelectedIssueId(Number(id)));
    router.push(`/issue/${id}`);
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    event.stop();

    const coordinates = event.latLng
      ? { lat: event.latLng.lat(), lng: event.latLng.lng() }
      : null;

    dispatch(setMapPin(coordinates));
  };

  return (
    <>
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={myLocation || center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              streetViewControl: false,
              mapTypeControlOptions: { mapTypeIds: [] },
            }}
            onClick={handleMapClick}
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
            {pinnable && pin && <Marker position={pin} />}
          </GoogleMap>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default React.memo(CustomMap);
