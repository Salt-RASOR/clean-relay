"use client";
import React, { useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import CustomInput from "../components/Input/CustomInput";
import Button from "../components/Buttons/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  ProfileErrors,
  createNewProfileThunk,
  selectProfileErrors,
  selectStatus,
  selectUserId,
  setProfileErrors,
  setUserLoggedIn,
} from "@/lib/features/profileSlice";
import { toast } from "react-toastify";
import supabase from "@/app/utils/supabaseLocal";
import { SignUpData } from "../common/interfaces";
import { useRouter } from "next/navigation";
import { Status } from "../common/constants";
import Loader from "../components/Loader/Loader";

const Page = () => {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const errors = useAppSelector(selectProfileErrors);
  const status = useAppSelector(selectStatus);

  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const updateInput = (key: keyof ProfileErrors, value: boolean) => {
    setTimeout(() => {
      dispatch(setProfileErrors({ key, value }));
    }, 3000);
  };

  const handleClickSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;
    const repeatPasswordValue = passwordConfirmRef.current?.value;

    if (!emailValue) {
      toast("Missing Email", { type: "error", toastId: "emailError" });
      dispatch(setProfileErrors({ key: "emailError", value: true }));
      updateInput("emailError", false);
      return;
    }

    if (!passwordValue) {
      toast("Missing Password", { type: "error", toastId: "passwordError" });
      dispatch(setProfileErrors({ key: "passwordError", value: true }));
      updateInput("passwordError", false);
      return;
    }

    if (!repeatPasswordValue) {
      toast("Missing Password Confirm", {
        type: "error",
        toastId: "repeatPasswordError",
      });
      dispatch(setProfileErrors({ key: "repeatPasswordError", value: true }));
      updateInput("repeatPasswordError", false);
      return;
    }

    //-------
    // password has to be at least 6 and at most 72 characters due to Supabase
    if (passwordValue.length < 6) {
      toast("Password has to be at least 6 characters", {
        type: "error",
        toastId: "passwordTooShortError",
      });
      dispatch(setProfileErrors({ key: "passwordError", value: true }));
      passwordRef.current.value = "";
      updateInput("passwordError", false);
      return;
    }

    if (passwordValue.length > 72) {
      toast("Password has to be at most 72 characters", {
        type: "error",
        toastId: "passwordTooLongError",
      });
      dispatch(setProfileErrors({ key: "passwordError", value: true }));
      passwordRef.current.value = "";
      updateInput("passwordError", false);
      return;
    } //-------

    if (passwordValue !== passwordConfirmRef.current?.value) {
      toast("Passwords have to match", {
        type: "error",
        toastId: "passwordMatchError",
      });
      dispatch(setProfileErrors({ key: "passwordError", value: true }));
      dispatch(setProfileErrors({ key: "repeatPasswordError", value: true }));
      passwordConfirmRef.current.value = "";
      passwordRef.current.value = "";
      updateInput("passwordError", false);
      updateInput("repeatPasswordError", false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: emailValue,
      password: passwordValue,
    });

    if (error) {
      toast(error.message, {
        type: "error",
        toastId: "userCreationError",
      });
      dispatch(setUserLoggedIn(false));

      emailRef.current.value = "";
      passwordConfirmRef.current.value = "";
      passwordRef.current.value = "";
      return;
    }

    if (data) {
      dispatch(
        createNewProfileThunk({ data: data as SignUpData, userId })
      ).then((result) => {
        if (!result.payload) {
          return toast("Failed To Sign Up", {
            type: "error",
            toastId: "signUpError",
          });
        }

        toast("Signed Up Successfully!", {
          type: "success",
          toastId: "signUpSuccess",
        });

        router.push("/profile");
      });
    }
  };

  const isLoading = status === Status.Loading;

  return (
    <>
      {isLoading && <Loader />}
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
        <form className="w-full max-w-xl" onSubmit={handleClickSubmit}>
          <CustomInput
            label={"Email *"}
            inputType={"email"}
            forwardedRef={emailRef}
            hasError={errors.emailError}
          />
          <CustomInput
            label={"Password *"}
            inputType={"password"}
            forwardedRef={passwordRef}
            hasError={errors.passwordError}
          />
          <CustomInput
            label={"Confirm Password  *"}
            inputType={"password"}
            forwardedRef={passwordConfirmRef}
            hasError={errors.repeatPasswordError}
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
    </>
  );
};

export default Page;
