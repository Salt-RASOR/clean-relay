"use client";

import { Status } from "@/app/common/constants";
import Button from "@/app/components/Buttons/Button";
import Loader from "@/app/components/Loader/Loader";
import CustomMap from "@/app/components/Map/CustomMap";
import { selectNewStatus } from "@/lib/features/newReportSlice";
import { useAppSelector } from "@/lib/hooks";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const status = useAppSelector(selectNewStatus);

  const handleClick = () => {
    router.push("/new-report/image");
  };

  return (
    <div className="px-4 w-full md:w-7/12 flex flex-col items-center gap-12">
      {status === Status.Loading && <Loader />}
      <div className="w-full">
        <CustomMap pinnable={true} />
      </div>
      <Button
        buttonText={"Done"}
        additionalClasses={clsx("w-full md:w-1/2")}
        clickHandler={handleClick}
      />
    </div>
  );
};

export default Page;
