"use client";

import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";


const containerStyle = {
  width: "auto", 
  height: "100vh", 
};

const center = {
  lat: 59.3293,
  lng: 18.0686,
};

const CustomMap = () => {
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
      }}
    />
  
  ) : (
    <></>
  );
};

export default React.memo(CustomMap);
