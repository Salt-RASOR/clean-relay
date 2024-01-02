import React from "react";
import clsx from "clsx";
import points from "@/app/public/points.svg";
import Image from "next/image";

type PointsProps = {
  pointsBalance: number;
};
const Points: React.FC<PointsProps> = ({ pointsBalance }) => {
  return (
    <div
      className={clsx(
        "w-full max-w-2xl",
        "flex flex-col justify-center items-center"
      )}>
      <Image src={points} alt={"points"} width={300} height={300} />
      <h1 className="font-bold text-primary_color text-3xl">Your balance is</h1>
      <p className="my-4 font-bold text-gold text-3xl">{pointsBalance} </p>
      <p className="font-bold text-primary_color text-3xl">points</p>
    </div>
  );
};

export default Points;
