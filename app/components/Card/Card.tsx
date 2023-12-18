import React from "react";
import Image from "next/image";

type CardProps = {
  image_path: string;
  adress: string;
  category: string;
  status: string;
};
const Card: React.FC<CardProps> = ({
  image_path,
  adress,
  category,
  status,
}) => {
  console.log(image_path);

  const isInProgress = status === "in progress";
  return (
    <div className="rounded-[21px] bg-card_bg p-8 relative my-6" style={{ boxShadow: "0 1.72px 6.86px rgba(0, 0, 0, 0.25)",}}>
      <div className="font-bold mb-5">{adress}</div>
      <div className="flex justify-center">
        <Image
          src={image_path}
          alt={category + status}
          width={200}
          height={100}
        />
      </div>
      <p className="my-4 capitalize">Category: {category}</p>
      <span className="text-sm ">Status: {status}</span>
      <div
        className="w-[46px] h-[46px] bg-red-500 bottom-0 right-0 absolute rounded-br-lg"
        style={{
          background: `linear-gradient(to bottom right, #f4f4f4 0%, #f4f4f4 ${
            isInProgress
              ? "50%, #5AC29E 50%, #5AC29E 100%"
              : "50%, #E20074 50%, #E20074 100%"
          })`,
        }}></div>
    </div>
  );
};

export default Card;
