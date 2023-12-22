import { Coordinates } from "../common/interfaces";

const degToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

const calculateDistance = (
  myLocation: Coordinates,
  otherLocation: Coordinates
) => {
  const R = 6371.0; // Earth radius in kilometers

  const lat1 = degToRadians(myLocation.lat);
  const lng1 = degToRadians(myLocation.lng);
  const lat2 = degToRadians(otherLocation.lat);
  const lng2 = degToRadians(otherLocation.lng);

  const dlat = lat2 - lat1;
  const dlng = lng2 - lng1;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distance = R * c;

  return distance;
};

export default calculateDistance;
