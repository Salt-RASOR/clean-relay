"use client";
import React from "react";
import clsx from "clsx";
import Button from "../Buttons/Button";
import CustomInput from "../Input/CustomInput";
import { ProfileErrors } from "@/lib/features/profileSlice";
import Modal from "../Modal/Modal";
import useHandleModal from "@/app/hooks/useHandleModal";

type ProfileProps = {
  nameRef: React.RefObject<HTMLInputElement>;
  phoneRef: React.RefObject<HTMLInputElement>;
  errors: ProfileErrors;
  currentUserEmail: string;
  currentUserName: string;
  currentUserPhone: string;
  checked: boolean;
  handleChange: () => void;
  handleSignOut: () => void;
  handleDelete: () => void;
  handleUpdateSubmit: (event: React.SyntheticEvent) => void;
};

const Profile: React.FC<ProfileProps> = ({
  nameRef,
  phoneRef,
  currentUserEmail,
  currentUserName,
  currentUserPhone,
  errors,
  handleSignOut,
  handleUpdateSubmit,
  handleDelete,
  checked,
  handleChange,
}) => {
  const { handleModalShow, showModal, handleModalClose } = useHandleModal();

  return (
    <div
      className={clsx(
        "px-4",
        "flex flex-col justify-center items-center",
        "background-container bg-violet"
      )}
    >
      <h1 className="font-bold mb-12 text-primary_color text-center text-lg">
        Update Profile
      </h1>
      <div className="flex flex-col-reverse sm:flex-row gap-12 items-center justify-between mb-6 w-full max-w-xl">
        <div className="flex items-center">
          <input
            id="helper-checkbox"
            type="checkbox"
            checked={checked}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            onChange={handleChange}
          />
          <label
            htmlFor="helper-checkbox"
            className="font-medium text-gray-900 dark:text-gray-300 ml-4 text-md"
          >
            I want to fix issues
          </label>
        </div>
        <div className="flex items-center justify-right gap-4">
          <Button
            buttonText={"Log Out"}
            clickHandler={handleSignOut}
            additionalClasses="w-[6.5rem]"
          />
          <Button
            buttonText={"Delete"}
            clickHandler={handleModalShow}
            additionalClasses="w-[6.5rem] bg-toast-red"
          />
        </div>
      </div>
      <form onSubmit={handleUpdateSubmit} className="w-full max-w-xl">
        <CustomInput
          label={"Name"}
          inputType={"text"}
          defaultValue={currentUserName}
          forwardedRef={nameRef}
          hasError={false}
        />
        <CustomInput
          label={"Phone"}
          inputType={"number"}
          defaultValue={currentUserPhone}
          forwardedRef={phoneRef}
          hasError={false}
        />
        <Button
          buttonText={"Update Profile"}
          additionalClasses={"my-6 w-full"}
        />
      </form>
      <Modal
        showModal={showModal}
        handleModalClose={handleModalClose}
        showX={false}
        centered={true}
      >
        <h2 className="text-center mt-6 font-bold mx-6">
          Are you sure you wish to delete your account?
        </h2>
        <div className="p-4 my-4 flex flex-col-reverse gap-4 sm:flex-row items-center justify-evenly min-w-[200px] text-primary_color">
          <Button
            buttonText={"Cancel"}
            clickHandler={handleModalClose}
            additionalClasses="w-[6.5rem]"
          />
          <Button
            buttonText={"Delete"}
            clickHandler={handleDelete}
            additionalClasses="w-[6.5rem] bg-toast-red"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
