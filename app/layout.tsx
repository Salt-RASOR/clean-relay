import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Navbar from "./components/Navbar/Navbar";
import StoreProvider from "./components/Providers/StoreProvider";
import LocationPrompter from "./components/Location/LocationPrompter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clean Relay",
  description: "Report issues in your neighborhood for someone to fix!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StoreProvider>
        <html lang="en">
          <meta
            name="format-detection"
            content="telephone=no, date=no, email=no, address=no"
          />
          <body className={clsx(inter.className)}>
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
              theme="colored"
            />
          </body>
        </html>
      </StoreProvider>
    </>
  );
}
