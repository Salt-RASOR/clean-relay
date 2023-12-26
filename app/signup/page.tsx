"use client";
import React, { useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import CustomInput from "../components/Input/CustomInput";
import Button from "../components/Buttons/Button";

const Page = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  //   ToDo get error from store
  const errors = false;

  const handleClickSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    if (emailValue && passwordValue) {
      if (passwordValue === passwordConfirmRef.current?.value) {
        console.log("Email:", emailValue);
        console.log("Password:", passwordValue);
        // ToDo implement sign up
      }
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
        Sign Up
      </h1>
      <form className="w-full md:w-7/12" onSubmit={handleClickSubmit}>
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
        <CustomInput
          label={"Confirm the Password  *"}
          inputType={"password"}
          forwardedRef={passwordConfirmRef}
          hasError={errors}
        />
        <Button buttonText={"Create Account"} additionalClasses={"my-6"} />
      </form>
      <div className="text-center mt-3 text-primary_color">
        <span className="mr-2"> Already have an account?</span>
        <Link
          href="/login"
          className="font-bold underline-offset-1 hover:underline">
          LOG IN
        </Link>
      </div>
    </div>
  );
};

export default Page;
