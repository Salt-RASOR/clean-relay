import React from "react";
import clsx from "clsx";
import noResults from "@/app/public/no_results.svg";
import Image from "next/image";

const NoResults = () => {
  return (
    <div
      className={clsx(
        "px-4",
        "flex flex-col justify-center items-center",
        "background-container bg-violet"
      )}>
      <Image
        className="mb-10"
        src={noResults}
        alt={"no data available"}
        width={200}
        height={200}
      />
      <h1 className="font-bold text-primary_color text-xl text-center">
        Sorry, no results to display
      </h1>
    </div>
  );
};

export default NoResults;
