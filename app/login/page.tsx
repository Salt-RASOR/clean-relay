"use client";
import React, { useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import CustomInput from "../components/Input/CustomInput";
import Button from "../components/Buttons/Button";

const Page = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //   ToDo get error from store
  const errors = false;

  const handleClickSubmit = async () => {
    if (emailRef.current && passwordRef.current) {
      console.log("Email:", emailRef.current.value);
      console.log("Password:", passwordRef.current.value);
      // todo implement login here
    }
  };

  return (
    <div
      className={clsx(
        "px-4",
        "flex flex-col justify-center items-center",
        "background-container bg-violet"
      )}>
      <h1 className="font-bold mb-10 text-primary_color text-center text-lg">
        Log In
      </h1>
      <form className="w-full md:w-7/12">
        <CustomInput
          label={"Email *"}
          inputType={"email"}
          forwardedRef={emailRef}
          hasError={errors}
        />
        <CustomInput
          label={"Password *"}
          inputType={"password"}
          forwardedRef={passwordRef}
          hasError={errors}
        />
        <Button
          clickHandler={handleClickSubmit}
          buttonText={"Login"}
          additionalClasses={"my-6"}
        />
      </form>
      <div className="text-center mt-3 text-primary_color">
        Need an account?{" "}
        <Link
          href="/signup"
          className="font-bold underline-offset-1 hover:underline">
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default Page;
