'use client'
import React from "react";
import BackButton from "@/app/components/Buttons/BackButton";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const redirectToHome = () =>{
    router.push('/')
  }
  return (
    <>
      <BackButton redirectToHome={redirectToHome}/>
      <div> about page</div>
    </>
  );
};

export default Page;
