import React from "react";
import MyIssue from "./MyIssue";
import NoResults from "../NoResults/NoResults";
import img from "@/app/public/authorize_image.svg";

const MyList = () => {
  const noResults = false;
  const categoryId = 2;
  const statusId = 1;
  const adress = "164 55 Nordanvag 94, Kista";
  const imgUrl = img;
  
  return (
    <>
      {noResults ? (
        <NoResults />
      ) : (
        <MyIssue
          categoryId={categoryId}
          statusId={statusId}
          adress={adress}
          imgUrl={imgUrl}
        />
      )}
    </>
  );
};

export default MyList;
