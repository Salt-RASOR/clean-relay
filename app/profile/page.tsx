"use client";

import React, { useRef } from "react";
import Login from "../components/Login/Login";
import Profile from "../components/Profile/Profile";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectUserLoggedIn,
  setProfileErrors,
} from "@/lib/features/profileSlice";

const Page = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const userLoggedIn = useAppSelector(selectUserLoggedIn);

  // ToDo get error from store
  const errors = false;

  const handleSignOut = () => {
    // ToDo implement sign out func
    console.log("click to Sign Out");
  };

  const handleUpdateSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("submit the form");

    // todo implement login here
    console.log("Email:", emailRef.current?.value);
    console.log("Password:", passwordRef.current?.value);
    console.log("Name", nameRef.current?.value);

    // Clear refs
    if (emailRef.current && nameRef.current && passwordRef.current) {
      emailRef.current.value = "";
      nameRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    if (!emailValue) {
      toast("Missing Image", { type: "error", toastId: "loginEmailError" });
      dispatch(setProfileErrors({ key: "loginEmailError", value: true }));
      return;
    }

    if (!passwordValue) {
      toast("Missing Password", {
        type: "error",
        toastId: "loginPasswordError",
      });
      dispatch(setProfileErrors({ key: "loginPasswordError", value: true }));
      return;
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <>
      {userLoggedIn ? (
        <Profile
          nameRef={nameRef}
          emailRef={emailRef}
          passwordRef={passwordRef}
          errors={errors}
          handleSignOut={handleSignOut}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      ) : (
        <Login
          emailRef={emailRef}
          passwordRef={passwordRef}
          errors={errors}
          handleClickSubmit={handleLogin}
        />
      )}
    </>
  );
};

export default Page;