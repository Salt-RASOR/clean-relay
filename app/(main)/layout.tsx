import React, { FC, PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import LocationPrompter from "../components/Location/LocationPrompter";
import AutoLogger from "../components/Login/AutoLogger";
import Navbar from "../components/Navbar/Navbar";
import LocalStorage from "../components/Providers/LocalStorage";
import StoreProvider from "../components/Providers/StoreProvider";
import "react-toastify/dist/ReactToastify.css";

const layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <AutoLogger />
      <LocalStorage />
      <LocationPrompter />
      <div className="container mx-auto w-full pb-[110px] sm:w-5/6">
        {children}
      </div>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={2500}
        limit={3}
        hideProgressBar
        closeOnClick={false}
        draggable={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme="colored"
      />
    </StoreProvider>
  );
};

export default layout;
