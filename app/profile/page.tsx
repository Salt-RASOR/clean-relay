"use client";
import React, { useRef } from "react";
import clsx from "clsx";
import Button from "../components/Buttons/Button";
import CustomInput from "../components/Input/CustomInput";

const Page = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //   ToDo get error from store
  const errors = false;

  const handleSignOut = () => {
    // ToDo implement sign out func
    console.log("click to Sign Out");
  };

  const handleUpdateSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("submit the form");
  };
  return (
    <div className="w-full md:w-7/12 m-auto">
      <div
        className="px-4 py-20 background-container bg-violet "
        style={{ height: "200px" }}>
        <div className="flex items-center justify-between">
          <div className="text-primary_color">Hello, user</div>
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
            placeholder={"Bob Marley"}
            forwardedRef={nameRef}
            hasError={errors}
          />
          <CustomInput
            label={"New Email"}
            inputType={"email"}
            placeholder={"Bob@gmail.com"}
            forwardedRef={emailRef}
            hasError={errors}
          />
          <CustomInput
            label={"New Password"}
            inputType={"password"}
            forwardedRef={passwordRef}
            hasError={errors}
          />
          <Button
            buttonText={"Update Profile"}
            additionalClasses={"my-6"}
          />
        </form>
      </div>
    </div>
  );
};

export default Page;
