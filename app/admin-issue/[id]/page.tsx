"use client";
import React from "react";
import clsx from "clsx";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import Modal from "@/app/components/Modal/Modal";
import useHandleModal from "@/app/hooks/useHandleModal";
import { shangeStatusOptions } from "@/app/common/constants";

const page = () => {
  const statusId = 2;
  const isBeingFixed = statusId === 2;
  const { handleModalShow, showModal, handleModalClose } = useHandleModal();

 const handleOptionsClick = () => {
// ToDo implement the  status changing
 }
 
  return (
    <>
      <div
        className={clsx(
          "max-w-[400px]",
          "relative",
          "border border-solid border-stroke_color rounded-[20px]"
        )}>
        <div
          className={clsx(
            "w-[46px] h-[46px]",
            "top-0 left-0 absolute z-[-1]",
            "rounded-tl-[20px]"
          )}
          style={{
            background: `linear-gradient(to top left, #fff 0%, #fff ${
              isBeingFixed
                ? "50%, #5AC29E 50%, #5AC29E 100%"
                : "50%, #E20074 50%, #E20074 100%"
            })`,
          }}></div>
        <header
          className={clsx(
            "border-b border-stroke_color",
            "relative  p-4",
            "flex items-center justify-between"
          )}>
          <p>
            <span className="font-bold pl-2">Status: </span>In progress
          </p>
          <button
            onClick={handleModalShow}
            type="button"
            className={clsx(
              "px-3 py-2",
              "rounded-lg",
              "focus:ring-4 focus:outline-none focus:ring-violet_hover"
            )}>
            <BsThreeDotsVertical />
          </button>
          <Modal showModal={showModal} handleModalClose={handleModalClose}>
            <div className="p-4 flex flex-col min-w-[200px] text-primary_color">
              {shangeStatusOptions.map((option, idx) => (
                <button
                onClick={handleOptionsClick}
                  className={clsx(
                    "px-3 py-4",
                    "rounded-lg",
                    "flex items-center  gap-4",
                    "focus:ring-4 focus:outline-none focus:ring-violet_hover hover:bg-violet_hover"
                  )}
                  key={idx}>
                  <span>{option.icon}</span> <span>{option.title}</span>
                </button>
              ))}
            </div>
          </Modal>
        </header>

        <main className="p-4 flex flex-col gap-4 items-center mb-6">
          <p className="text-left w-full">
            <span className="font-bold pl-2">Category: </span>Trash
          </p>
          <Image
            src={
              "https://cdnimgen.vietnamplus.vn/t870/uploaded/unvjsai/2019_08_13/trash_1_1.jpg"
            }
            alt=""
            width={200}
            height={200}
          />
          <p className="text-left w-full">
            <span className="font-bold">
              860 25 Magasinsgatan 17, Ljungsbro Sweden
            </span>
          </p>
          <p>
            Lorem ipsum Maecenas est turpis, facilisis sit amet euismod at,
            bibendum sit amet diam. Suspendisse nec placerat lacus. Mauris nec
            feugiat neque, nec
          </p>
        </main>
      </div>
    </>
  );
};

export default page;
