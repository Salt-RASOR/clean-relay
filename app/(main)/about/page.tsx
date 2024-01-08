"use client";
import React from "react";
import BackButton from "@/app/components/Buttons/BackButton";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import Link from "next/link";
import Logo from "@/app/components/Logo/Logo";
import Image from "next/image";
import features from "@/app/public/features.png";
import developers from "@/app/public/developers.png";
import mission from "@/app/public/mission.png";
import clsx from "clsx";
import { values, missions } from "./data";

const Page = () => {
  const router = useRouter();

  const redirectToHome = () => {
    router.push("/");
  };
  return (
    <div className="px-4 my-4">
      <Logo />
      <div className="mt-8 mb-20">
        <BackButton redirectToHome={redirectToHome} />
      </div>

      <section>
        <h1 className="font-bold mb-10 text-primary_color text-center text-lg">
          Our mission
        </h1>
        <div className="flex flex-col items-center">
          <div
            className={clsx(
              "p-6 bg-white rounded shadow-lg",
              "w-full md:w-2/3"
            )}>
            <div className="flex justify-center">
              <Image src={mission} width={400} alt={"our values"} />
            </div>
            {missions.map((mission, i) => (
              <p className="mt-4 " key={i}>
                <span className="inline-block leading-none bg-violet p-1 mr-2  rounded-md ">
                  <IoMdCheckmark />
                </span>
                {mission.description}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-bold mb-10 text-primary_color text-center text-lg">
          Core Values
        </h2>

        <div className="flex flex-col items-center">
          <Image src={features} width={400} alt={"our values"} />

          <div className="grid lg:col-span-2 mt-4">
            <div className="flex flex-wrap self-center gap-4 ">
              {values.map((value) => (
                <>
                  <div
                    className="w-full lg:w-[49%]"
                    data-aos="zoom-out"
                    data-aos-delay="200">
                    <div
                      className={clsx(
                        "p-6  bg-white  rounded shadow-lg transition duration-300 ease-in-out h-full"
                      )}>
                      <div className="flex items-center">
                        <span className="inline-block leading-none bg-violet p-1 mr-2 rounded-md ">
                          <IoMdCheckmark />
                        </span>

                        <h3 className="text-md font-bold text-blue-900 leading-normal my-0">
                          {value.name}
                        </h3>
                      </div>
                      <p className="mt-4">{value.description}</p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="bg-violet p-6 rounded flex justify-center">
          <div className="max-w-md flex items-center justify-between ">
            <div className="text-primary_color">
              <h2 className="font-bold mb-10 text-lg">Who We Are</h2>
              <p>
                <Link
                  href="https://github.com/anttijankeri"
                  className="flex items-center gap-2 my-4">
                  <FaGithub /> <span>Antti Jankeri</span>
                </Link>
              </p>
              <p>
                <Link
                  href="https://github.com/SvitlanaRybakova"
                  className="flex items-center gap-2">
                  <FaGithub /> <span>Svitlana Rybakova </span>
                </Link>
              </p>
            </div>

            <Image src={developers} width={200} alt={"salt developers"} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
