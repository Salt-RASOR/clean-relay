"use client";
import React from "react";
import Button from "../Buttons/Button";
import CustomInput from "../Input/CustomInput";

type ProfileProps = {
  nameRef: React.RefObject<HTMLInputElement>;
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  errors: boolean;
  handleSignOut: () => void;
  handleUpdateSubmit: (event: React.SyntheticEvent) => void;
};
const Profile: React.FC<ProfileProps> = ({
  nameRef,
  emailRef,
  passwordRef,
  errors,
  handleSignOut,
  handleUpdateSubmit,
}) => {
  // ToDo get default values from API
  const currentName = "Bob Marley";
  const currentEmail = "Bob@gmail.com";

  return (
    <div className="w-full md:w-7/12 m-auto">
      <div
        className="px-4 py-20 background-container bg-violet "
        style={{ height: "200px" }}>
        <div className="flex items-center justify-between">
          <div className="text-primary_color">Hello, <span>{currentName}</span> </div>
          <Button
            buttonText={"Sign Out"}
            clickHandler={handleSignOut}
            additionalClasses="w-[6.5rem]"
          />
        </div>
      </div>
      <div className="px-4 mt-14">
        <h1 className="font-bold mb-10 text-primary_color text-center text-lg">
          Update Profile
        </h1>
        <form className="w-full" onSubmit={handleUpdateSubmit}>
          <CustomInput
            label={"Name"}
            inputType={"text"} 
            defaultValue={currentName}
            forwardedRef={nameRef}
            hasError={errors}
          />
          <CustomInput
            label={"New Email"}
            inputType={"email"}
            defaultValue={currentEmail}
            forwardedRef={emailRef}
            hasError={errors}
          />
          <CustomInput
            label={"New Password"}
            inputType={"password"}
            forwardedRef={passwordRef}
            hasError={errors}
          />
          <Button buttonText={"Update Profile"} additionalClasses={"my-6 w-full"} />
        </form>
      </div>
    </div>
  );
};

export default Profile;
