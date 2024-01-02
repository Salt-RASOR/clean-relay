"use client";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import notConnected from "@/app/public/not_connected.svg";
import Button from "./components/Buttons/Button";

const NotFound = () => {
  const router = useRouter();

  const redirectToHome = () => {
    router.push("/");
  };
  return (
    <div
      className={clsx(
        "px-4",
        "flex flex-col justify-center items-center",
        "background-container bg-violet",
        "text-primary_color"
      )}>
      <div
        className={clsx(
          "w-full max-w-xl",
          "flex flex-col justify-center items-center"
        )}>
        <h1 className="font-bold text-center text-5xl">
          Oops...
        </h1>
        <Image 
        className="my-4"
        src={notConnected} alt={"page not found"} width={200} height={200} />
        <h2 className="font-bold text-2xl">Page Not Found</h2>
        <p className="mt-3 mb-20 text-center">We can’t find the page you are looking for</p>
        <Button
          buttonText={"Go to home page"}
          additionalClasses={"w-full"}
          clickHandler={redirectToHome}
        />
      </div>
    </div>
  );
};

export default NotFound;
