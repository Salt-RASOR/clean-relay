import React from "react";
import Image from "next/image";
import submittedReport from "@/app/public/submitted_report.svg";
import { useRouter } from "next/navigation";

type ConfirmationProps = {
  text: string;
  children?: React.ReactNode;
  additionalClass?: string;
};
const Confirmation: React.FC<ConfirmationProps> = ({
  text,
  children,
  additionalClass,
}) => {
  const router = useRouter();

  const moveToHome = () => {
    router.push("/");
  };

  return (
    <div className={`${additionalClass} px-2`}>
      <div className="flex flex-col justify-center items-center py-10">
        <div
          onClick={moveToHome}
          className="flex flex-col justify-center items-center cursor-pointer">
          <Image
            width={100}
            height={100}
            src={submittedReport}
            alt="uploaded issue"
          />
          <p className="font-bold text-center text-primary_color text-2xl max-w-80">
            Thank you! <br />
            {text}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
