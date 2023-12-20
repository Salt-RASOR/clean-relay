import { useState, useEffect } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

const useLocation = () => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return { getUserLocation, userLocation };
};

export default useLocation;
