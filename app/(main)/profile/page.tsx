"use client";

import React, { useRef } from "react";
import Login from "../../components/Login/Login";
import Profile from "../../components/Profile/Profile";
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
  selectUserId,
  logoutUser,
  selectUserRole,
  selectProfileStatus,
  deleteProfileThunk,
} from "@/lib/features/profileSlice";
import supabase from "../../utils/supabaseLocal";
import generateAuthData from "../../utils/generateAuthData";
import { Roles, Status } from "../../common/constants";
import Loader from "../../components/Loader/Loader";
import { getIssuesThunk } from "@/lib/features/issuesSlice";
import { useRouter } from "next/navigation";

const Page = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const userRole = useAppSelector(selectUserRole);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prevState) => !prevState);
  };

  const dispatch = useAppDispatch();

  const router = useRouter();

  const userLoggedIn = useAppSelector(selectUserLoggedIn);
  const currentUserEmail = useAppSelector(selectUserEmail);
  const currentUserName = useAppSelector(selectUserName);
  const currentUserPhone = useAppSelector(selectUserPhome);
  const userId = useAppSelector(selectUserId);
  const status = useAppSelector(selectProfileStatus);
  const errors = useAppSelector(selectProfileErrors);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast("Couldnt Sign Out", { type: "error", toastId: "signoutError" });
    } else {
      toast("Signed Out", { type: "success", toastId: "signoutSuccess" });
      dispatch(logoutUser());
    }
  };

  const updateInput = (key: keyof ProfileErrors, value: boolean) => {
    setTimeout(() => {
      dispatch(setProfileErrors({ key, value }));
    }, 3000);
  };

  const handleDelete = async () => {
    const authData = await generateAuthData(userId, currentUserEmail as string);
    dispatch(deleteProfileThunk(authData)).then((result) => {
      if (!result.payload) {
        return toast("Failed To Delete", {
          type: "error",
          toastId: "accountDeleteError",
        });
      }

      dispatch(getIssuesThunk());

      toast("Account Deleted", {
        type: "success",
        toastId: "accountDeleteSuccess",
      });
    });
  };

  const handleUpdateSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const nameValue = nameRef.current?.value || "";
    const phoneValue = phoneRef.current?.value || "";

    const data = {
      name: nameValue,
      phone: phoneValue,
      roleId: checked ? 2 : 1,
    };

    const authData = await generateAuthData(userId, currentUserEmail as string);

    dispatch(updateUserCredentialsThunk({ data, authData })).then((result) => {
      if (!result.payload) {
        return toast("Failed To Update", {
          type: "error",
          toastId: "updateError",
        });
      }

      toast("Updated Successfully!", {
        type: "success",
        toastId: "updateSuccess",
      });

      router.push("/");
    });
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
      dispatch(logoutUser());
      emailRef.current.value = "";
      passwordRef.current.value = "";
      return;
    }

    if (data) {
      const authData = await generateAuthData(userId, emailValue);
      dispatch(getProfileDataThunk(authData)).then((result) => {
        if (!result.payload) {
          return toast("Failed To Log In", {
            type: "error",
            toastId: "loginError",
          });
        }

        toast("Logged In Successfully!", {
          type: "success",
          toastId: "loginSuccess",
        });
      });
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  React.useEffect(() => {
    if (userRole == null) {
      setChecked(false);
    }
    if (userRole === Roles.UserRole) {
      setChecked(false);
    } else if (userRole === Roles.SuperUser) {
      setChecked(true);
    }
  }, [userRole]);

  return (
    <>
      {status === Status.Loading && <Loader />}
      {userLoggedIn ? (
        <Profile
          nameRef={nameRef}
          phoneRef={phoneRef}
          errors={errors}
          handleSignOut={handleSignOut}
          handleUpdateSubmit={handleUpdateSubmit}
          checked={checked}
          handleChange={handleChange}
          handleDelete={handleDelete}
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
