"use client";
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  selectAllIssues,
  getIssuesThunk,
} from "../../lib/features/issuesSlice";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import IssuePin from "./IssuePin/IssuePin";

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

  return (
    <>
      {isLoaded ? (
        <>
        <IssuePin category={3} status={2}/>
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
            {issues.map((coordinate) => (
              <Marker
                key={coordinate.id}
                position={{ lat: coordinate.lat, lng: coordinate.lng }}
                icon={{
                  url: <IssuePin
                      category={coordinate.category.id}
                      status={coordinate.status.id}
                    />
                }}
              />
            ))}
          </GoogleMap>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default React.memo(CustomMap);
