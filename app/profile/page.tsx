"use client";

import React, { useRef } from "react";
import Login from "../components/Login/Login";
import Profile from "../components/Profile/Profile";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  ProfileErrors,
  getProfileDataThunk,
  selectProfileErrors,
  selectUserLoggedIn,
  selectUserEmail,
  selectUserName,
  setProfileErrors,
  setUserLoggedIn,
  selectUserPhome,
  updateUserCredentialsThunk,
} from "@/lib/features/profileSlice";
import supabase from "../utils/supabaseLocal";

const Page = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const userLoggedIn = true;
  // const userLoggedIn = useAppSelector(selectUserLoggedIn);
  const currentUserEmail = useAppSelector(selectUserEmail);
  const currentUserName = useAppSelector(selectUserName);
  const currentUserPhone = useAppSelector(selectUserPhome);

  const errors = useAppSelector(selectProfileErrors);

  const handleSignOut = () => {
    // ToDo implement sign out func
    console.log("click to Sign Out");
  };

  const updateInput = (key: keyof ProfileErrors, value: boolean) => {
    setTimeout(() => {
      dispatch(setProfileErrors({ key, value }));
    }, 3000);
  };

  const handleUpdateSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const nameValue = nameRef.current?.value || "";
    const phoneValue = phoneRef.current?.value || "";

    let email;

    if (currentUserEmail.length === 0) {
      email = localStorage.getItem("userEmail");
    } else {
      email = currentUserEmail;
    }

    const data = {
      name: nameValue,
      phone: phoneValue,
      roleId: 1,
    };
    dispatch(
      updateUserCredentialsThunk({ email: currentUserEmail, data: data })
    );

    // Clear refs
    if (nameRef.current && passwordRef.current) {
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
      updateInput("loginEmailError", false);
      return;
    }

    if (!passwordValue) {
      toast("Missing Password", {
        type: "error",
        toastId: "loginPasswordError",
      });
      dispatch(setProfileErrors({ key: "loginPasswordError", value: true }));
      updateInput("loginPasswordError", false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailValue,
      password: passwordValue,
    });

    if (error) {
      toast(error.message, {
        type: "error",
        toastId: "userLoginError",
      });
      dispatch(setUserLoggedIn(false));
      emailRef.current.value = "";
      passwordRef.current.value = "";
      return;
    }

    if (data) {
      dispatch(getProfileDataThunk(data.user.email as string)).then(
        (result) => {
          if (!result.payload) {
            return toast("Failed To Log In", { type: "error" });
          }

          toast("Logged In Successfully!", {
            type: "success",
            toastId: "loginSuccess",
          });
        }
      );
     
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <>
      {userLoggedIn ? (
        <Profile
          nameRef={nameRef}
          phoneRef={phoneRef}
          errors={errors}
          handleSignOut={handleSignOut}
          handleUpdateSubmit={handleUpdateSubmit}
          currentUserEmail={currentUserEmail}
          currentUserName={currentUserName}
          currentUserPhone={currentUserPhone}
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
