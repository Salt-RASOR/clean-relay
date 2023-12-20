"use client";
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  selectAllIssues,
  getIssuesThunk,
} from "../../lib/features/issuesSlice";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import IssuePin from "./IssuePin/IssuePin";
import { issuesIcons2 } from "../common/contants";
import Image from 'next/image'

const containerStyle = {
  width: "auto",
  height: "100vh",
};

const center = {
  lat: 59.3293,
  lng: 18.0686,
};

const CustomMap = () => {
  const issues = useAppSelector(selectAllIssues);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getIssuesThunk());
  }, [dispatch]);

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
    const foundCategory = issuesIcons2.find((icon) => icon.id === categoryId);
    return foundCategory ? foundCategory.icon : null;
  };
  const getCategoryIconWithBgColor = (iconUrl: string, bgColor: string) => {
    
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="${bgColor}" stroke="#000" strokeWidth="2" />
        ${<Image src={iconUrl}  width={20} height={20}  alt={''}/>}
      </svg>
    `;
    return `data:image/svg+xml;utf-8,${encodeURIComponent(svgString)}`;
  };

  const test = getCategoryIconWithBgColor(
    "https://svgshare.com/i/113A.svg",
    "red-300"
  );

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
          <IssuePin category={3} status={2} />
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              streetViewControl: false,
              mapTypeControlOptions: { mapTypeIds: [] },
            }}>
            {mock.map((coordinate) => {
              const categoryIcon = getCategoryIcon(coordinate.category.id);
              const bgColor = coordinate.category.id === 1 ? "red" : "green";
              console.log(bgColor);
              const url = getCategoryIconWithBgColor(categoryIcon, bgColor);
              return (
                <Marker
                  key={coordinate.id}
                  position={{ lat: coordinate.lat, lng: coordinate.lng }}
                  icon={{
                    url: categoryIcon,
                  }}>
                </Marker>
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
