"use client";

import React, { useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import CustomInput from "../components/Input/CustomInput";
import Button from "../components/Buttons/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectProfileErrors,
  setProfileErrors,
} from "@/lib/features/profileSlice";
import { toast } from "react-toastify";

const Page = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const errors = useAppSelector(selectProfileErrors);

  const dispatch = useAppDispatch();

  const updateEmailInput = () => {
    if (errors.emailError) {
      dispatch(setProfileErrors({ key: "emailError", value: false }));
    }
  };

  const updatePasswordInput = () => {
    if (errors.passwordError) {
      dispatch(setProfileErrors({ key: "passwordError", value: false }));
    }
  };

  const updateRepeatPasswordInput = () => {
    if (errors.emailError) {
      dispatch(setProfileErrors({ key: "repeatPasswordError", value: false }));
    }
  };

  const handleClickSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;
    const repeatPasswordValue = passwordConfirmRef.current?.value;

    if (!emailValue) {
      toast("Missing Image", { type: "error", toastId: "emailError" });
      return;
    }

    if (!passwordValue) {
      toast("Missing Password", { type: "error", toastId: "passwordError" });
      return;
    }

    if (!repeatPasswordValue) {
      toast("Missing Password Confirm", {
        type: "error",
        toastId: "repeatPasswordError",
      });
      return;
    }

    //-------
    // password has to be at least 6 and at most 72 characters due to Supabase
    if (passwordValue.length < 6) {
      toast("Password has to be at least 6 characters", {
        type: "error",
        toastId: "passwordTooShortError",
      });
      return;
    }

    if (passwordValue.length > 72) {
      toast("Password has to be at most 72 characters", {
        type: "error",
        toastId: "passwordTooLongError",
      });
      return;
    } //-------

    if (passwordValue !== passwordConfirmRef.current?.value) {
      toast("Passwords have to match", {
        type: "error",
        toastId: "passwordMatchError",
      });
      return;
    }

    console.log("Email:", emailValue);
    console.log("Password:", passwordValue);
    // ToDo implement sign up
  };

  return (
    <div
      className={clsx(
        "px-4",
        "flex flex-col justify-center items-center",
        "background-container bg-violet"
      )}
    >
      <h1 className="font-bold mb-10 text-primary_color text-center text-lg">
        Sign Up
      </h1>
      <form className="w-full max-w-2xl" onSubmit={handleClickSubmit}>
        <CustomInput
          label={"Email *"}
          inputType={"email"}
          forwardedRef={emailRef}
          hasError={errors.emailError}
          onChange={updateEmailInput}
        />
        <CustomInput
          label={"Password *"}
          inputType={"password"}
          forwardedRef={passwordRef}
          hasError={errors.passwordError}
          onChange={updatePasswordInput}
        />
        <CustomInput
          label={"Confirm Password  *"}
          inputType={"password"}
          forwardedRef={passwordConfirmRef}
          hasError={errors.repeatPasswordError}
          onChange={updateRepeatPasswordInput}
        />
        <Button
          buttonText={"Create Account"}
          additionalClasses={"my-6 w-full"}
        />
      </form>
      <div className="text-center mt-3 text-primary_color">
        <span className="mr-2"> Already have an account?</span>
        <Link
          href="/profile"
          className="font-bold underline-offset-1 hover:underline"
        >
          LOG IN
        </Link>
      </div>
    </div>
  );
};

export default Page;
