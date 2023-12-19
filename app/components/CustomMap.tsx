"use client";

import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  selectAllIssues,
  getIssuesThunk,
} from "../../lib/features/issuesSlice";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";

const containerStyle = {
  width: "auto",
  height: "100vh",
};

const center = {
  lat: 59.3293,
  lng: 18.0686,
};

const CustomMap = () => {
  const salties = useAppSelector(selectAllIssues);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getIssuesThunk());
  }, []);

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

  const initialCoordinates = [
    { lat: 59.3293, lng: 18.0686 },
    { lat: 59.33, lng: 18.07 },
  ];

  return isLoaded ? (
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
      {initialCoordinates.map((coordinate, index) => (
        <Marker
          key={index}
          position={{ lat: coordinate.lat, lng: coordinate.lng }}
        />
      ))}
    </GoogleMap>
  ) : (
    <>Loading...</>
  );
};

export default React.memo(CustomMap);
