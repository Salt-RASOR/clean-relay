"use client";

import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { selectAllIssues, selectIconImages } from "@/lib/features/issuesSlice";
import { useAppSelector } from "@/lib/hooks";
import { issuesStatusColors } from "@/app/common/constants";

const containerStyle = {
  width: "auto",
  height: "100vh",
};

const center = {
  lat: 59.3996,
  lng: 17.9484,
};

const CustomMap = () => {
  const issues = useAppSelector(selectAllIssues);
  const iconImages = useAppSelector(selectIconImages);

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

  const getCategoryIcon = (categoryId: number) => {
    const foundCategory = iconImages.find((icon) => icon.id === categoryId);
    return foundCategory ? foundCategory.svgString : "";
  };

  const getStatusColor = (statusId: number) => {
    const foundStatus = issuesStatusColors.find(
      (status) => status.id === statusId
    );
    return foundStatus ? foundStatus.color : "";
  };

  const getPinImage = (iconId: number, statusId: number) => {
    const bgColor = getStatusColor(statusId);
    const iconString = getCategoryIcon(iconId);

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
        <rect x="0" y="0" width="30" height="30" rx="6" ry="6" fill="${bgColor}" />
        ${iconString}
      </svg>
    `;

    console.log(svgString);
    const pinUrl = `data:image/svg+xml;utf-8,${encodeURIComponent(svgString)}`;
    return pinUrl;
  };

  const mock = [
    {
      id: 1,
      userId: 1,
      lat: 59.3996,
      lng: 17.9484,
      categoryId: 2,
      statusId: 34,
      userText: "string",
      imgUrl: "string",
      category: {
        id: 1,
        name: "snow",
      },
      status: {
        id: 1,
        text: "untouched",
      },
    },
  ];

  return (
    <>
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              streetViewControl: false,
              mapTypeControlOptions: { mapTypeIds: [] },
            }}
          >
            {mock.map((coordinate) => {
              const categoryIcon = coordinate.category.id;
              const bgColor = coordinate.status.id;

              const url = getPinImage(categoryIcon, bgColor);

              return (
                <Marker
                  key={coordinate.id}
                  position={{ lat: coordinate.lat, lng: coordinate.lng }}
                  icon={{
                    url: url,
                  }}
                />
              );
            })}
          </GoogleMap>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default React.memo(CustomMap);
