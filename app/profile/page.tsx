"use client";
import React, { useRef } from "react";
import Login from "../components/Login/Login";
import Profile from "../components/Profile/Profile";

const Page = () => {
    // ToDo get authorization
  const isAuthorized = false;
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
    // todo implement login here
    console.log("Email:", emailRef.current?.value);
    console.log("Password:", passwordRef.current?.value);
    
    // clear refs
    if (emailRef.current && passwordRef.current) {
        emailRef.current.value = "";
        passwordRef.current.value = "";
    }


  };

  return (
    <>
      {isAuthorized ? (
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
