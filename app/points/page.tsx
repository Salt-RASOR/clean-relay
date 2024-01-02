import React from "react";
import clsx from "clsx";
import Points from "../components/Points/Points";
import AuthVerifier from "../components/AuthVerifier/AuthVerifier";

const page = () => {
  // ToDo get authorization
  const isAuthorized = false;
  const pointsBalance = 300;
  
  return (
    <div
      className={clsx(
        "px-4",
        "flex flex-col justify-center items-center",
        "background-container bg-violet"
      )}>
      {isAuthorized ? (
        <Points pointsBalance={pointsBalance} />
      ) : (
        <AuthVerifier />
      )}
    </div>
  );
};

export default page;
