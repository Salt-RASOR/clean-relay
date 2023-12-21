import React from "react";
import Image from "next/image";
import submittedReport from "@/app/public/submitted_report.svg";

type ConfirmationProps = {
  text: string;
  children?: React.ReactNode
};
const Confirmation: React.FC<ConfirmationProps> = ({ text, children }) => {
  return (
    <div className="background-container bg-violet px-2">
      <div className="flex flex-col justify-center items-center pt-20">
        <Image width={200} height={200} src={submittedReport} alt="" />
        <p className="font-bold text-center text-primary_color text-2xl max-w-80">
        Thank you! <br />{text}
        </p>
        {children}
      </div>
    </div>
  );
};

export default Confirmation;
