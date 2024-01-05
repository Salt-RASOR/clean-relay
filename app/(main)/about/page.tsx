"use client";
import React from "react";
import BackButton from "@/app/components/Buttons/BackButton";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Logo from "@/app/components/Logo/Logo";

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

      <article>
        <h1 className="font-bold mb-10 text-primary_color text-center text-lg">
          {" "}
          Our mission
        </h1>
        <p>
          Our mission is to create a collaborative digital platform that
          empowers individuals to uphold cleanliness in their communities by
          facilitating easy reporting and resolution of local environmental
          issues.
        </p>
        <p>
          Our web application serves as a nexus for users to identify, report,
          and address cleanliness concerns within their vicinity. By fostering a
          network of proactive individuals, we aim to cultivate a sense of
          shared responsibility and promote a cleaner, healthier living
          environment for all
        </p>
      </article>

      <article>
        <h2>Core Values</h2>
        <p>
          Responsibility: Empowering individuals to take ownership of their
          surroundings and contribute positively to their community's
          cleanliness. Collaboration: Fostering a culture of cooperation where
          users work together to achieve a common goal of a cleaner environment.
          Accessibility: Ensuring that the platform is user-friendly, inclusive,
          and accessible to all individuals, regardless of their background or
          technical expertise. among users. Sustainability: Advocating for
          sustainable practices and encouraging eco-friendly solutions in
          resolving cleanliness issues.
        </p>
      </article>

      <div className="border-t border-stroke_color">
        <p> &lt;salt/&gt; 2024 </p>
        <Link href="https://github.com/anttijankeri">
          {" "}
          <FaGithub /> <span>Antti Jankeri</span>{" "}
        </Link>
        <Link href="https://github.com/SvitlanaRybakova">
          <FaGithub /> <span>Svitlana Rybakova </span>
        </Link>
      </div>
    </div>
  );
};

export default Page;
