import { Coordinates } from "@/app/common/interfaces";
import calculateDistance from "@/app/utils/calculateDistance";
import { FC } from "react";
import { RiPinDistanceLine } from "react-icons/ri";

type DistanceProps = {
  myLocation: Coordinates | null;
  otherLocation: Coordinates;
  className?: string;
};

const Distance: FC<DistanceProps> = ({
  myLocation,
  otherLocation,
  className,
}) => {
  if (!myLocation) {
    return <></>;
  }

  const dist = calculateDistance(myLocation, otherLocation);

  return (
    <p className="flex items-center gap-2">
      <RiPinDistanceLine />
      <p className={className}>{dist.toFixed(1) + " km"}</p>
    </p>
  );
};

export default Distance;
