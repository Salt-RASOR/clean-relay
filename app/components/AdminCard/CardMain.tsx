"use client";

import { selectMyLocation } from "@/lib/features/profileSlice";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { GiMatterStates } from "react-icons/gi";
import Distance from "../Location/Distance";

type CardMainProps = {
  categoryName: string | undefined;
  userText: string | undefined;
  imgUrl: string | undefined;
  address: string | undefined;
  statusText: string;
  lat: number;
  lng: number;
};
const CardMain: React.FC<CardMainProps> = ({
  categoryName,
  userText,
  imgUrl,
  address,
  statusText,
  lat,
  lng,
}) => {
  const myLocation = useAppSelector(selectMyLocation);
  return (
    <main className="px-4 flex flex-col gap-4 items-center my-6">
      <div className="flex justify-between text-slate-600 italic w-full">
        <p className="flex items-center gap-2">
          <GiMatterStates /> <span>{statusText}</span>
        </p>
        <Distance myLocation={myLocation} otherLocation={{ lat, lng }} />
      </div>
      <Image
        src={imgUrl ? imgUrl : ""}
        alt={(categoryName ?? "") + userText}
        width={600}
        height={200}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <p className="text-left w-full">
        <span className="font-bold">{address}</span>
      </p>
      <p className="text-left w-full">{userText}</p>
    </main>
  );
};

export default CardMain;
