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
  showMyLocation?: boolean;
}

const CustomMap: FC<CustomMapProps> = ({
  issues = [],
  pinnable = false,
  showMyLocation = true,
}) => {
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

  const customMarker =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="34" viewBox="0 0 20 34">' +
        '<path d="M10,0C4.5,0,0,4.5,0,10c0,10.8,10,23.2,10,23.2S20,20.8,20,10C20,4.5,15.5,0,10,0z M10,15c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S12.8,15,10,15z" fill="blue" stroke="white" stroke-width="1"/>' +
        "</svg>"
    );

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
            {showMyLocation && myLocation && (
              <Marker
                position={myLocation}
                clickable={false}
                draggable={false}
                icon={customMarker}
              />
            )}
            {pinnable && pin && (
              <Marker
                position={pin}
                clickable={false}
                draggable={false}
                zIndex={1000}
              />
            )}
          </GoogleMap>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default React.memo(CustomMap);
