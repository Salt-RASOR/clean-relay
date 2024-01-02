"use client";
import React, { useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import CustomInput from "../Input/CustomInput";
import Button from "../Buttons/Button";

type LoginProps = {
    emailRef: React.RefObject<HTMLInputElement>;
    passwordRef: React.RefObject<HTMLInputElement>;
    errors: boolean;
    handleClickSubmit: (event: React.SyntheticEvent) => void;
  };

const Login: React.FC<LoginProps> = ({emailRef, passwordRef, errors, handleClickSubmit}) => {
 
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
      <form className="w-full  max-w-2xl" onSubmit={handleClickSubmit}>
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
        <Button buttonText={"Login"} additionalClasses={"my-6 w-full"} />
      </form>
      <div className="text-center mt-3 text-primary_color">
        <span className="mr-2"> Need an account?</span>
        <Link
          href="/signup"
          className="font-bold underline-offset-1 hover:underline">
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default Login;
