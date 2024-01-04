"use client";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import authorizeImage from "@/app/public/authorize_image.svg";
import Button from "@/app/components/Buttons/Button";

const AuthVerifier = () => {
  const router = useRouter();

  const redirectToAuth = () => {
    router.push(`/profile`);
  };

  return (
    <div
      className={clsx(
        "w-full max-w-xl",
        "flex flex-col justify-center items-center"
      )}
    >
      <h1 className="text-center text-primary_color text-2xl pt-10">
        Log in to view your points
      </h1>
      <Image
        className="mt-10 mb-20"
        src={authorizeImage}
        alt={"Authorize for full access"}
        width={300}
        height={300}
      />
      <Button
        buttonText={"Go to log in page"}
        additionalClasses={"w-full"}
        clickHandler={redirectToAuth}
      />
    </div>
  );
};

export default AuthVerifier;
