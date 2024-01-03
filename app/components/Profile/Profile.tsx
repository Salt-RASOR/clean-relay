"use client";
import React from "react";
import clsx from "clsx";
import Button from "../Buttons/Button";
import CustomInput from "../Input/CustomInput";
import { ProfileErrors } from "@/lib/features/profileSlice";

type ProfileProps = {
  nameRef: React.RefObject<HTMLInputElement>;
  phoneRef: React.RefObject<HTMLInputElement>;
  errors: ProfileErrors;
  currentUserEmail: string;
  currentUserName: string;
  currentUserPhone: string;
  handleSignOut: () => void;
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
}) => {
  
  return (
    <div className={clsx("px-4 py-20", "background-container bg-violet mb-[110px]")}>
      <div className="max-w-2xl m-auto">
        <div className=" flex items-center justify-between mb-40">
          <div className="text-primary_color">Hello, user</div>
          <Button
            buttonText={"Sign Out"}
            clickHandler={handleSignOut}
            additionalClasses="w-[6.5rem]"
          />
        </div>

        <h1 className="font-bold mb-10 text-primary_color text-center text-lg">
          Update Profile
        </h1>
        <form onSubmit={handleUpdateSubmit}>
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
      </div>
    </div>
  );
};

export default Profile;
