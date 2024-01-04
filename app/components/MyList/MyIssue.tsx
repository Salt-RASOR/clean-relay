import getIssueIcon from "@/app/utils/getIssueIcon";
import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { selectIconImages } from "@/lib/features/issuesSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import clsx from "clsx";

type MyIssueProps = {
  categoryId: number;
  statusId: number;
  adress: string;
  imgUrl: string;
};

const MyIssue: React.FC<MyIssueProps> = ({
  categoryId,
  statusId,
  adress,
  imgUrl,
}) => {
  const iconList = useAppSelector(selectIconImages);
  const categoryIconUrl = getIssueIcon(iconList, categoryId, statusId);
  return (
    <div className={clsx("flex items-center justify-between", "border-b border-solid border-stroke_color")}>
      <div className="flex items-center gap-4 w-2/4">
        <Image src={categoryIconUrl} alt={""} width={30} height={30} />
        <p>{adress}</p>
      </div>

      <Image
        src={imgUrl}
        alt={""}
        quality={50}
        width={50}
        height={50}
        className="object-cover my-4 md:w-[70px] md:h-[70px] lg:w-[100px] lg:h-[100px]"
        // className="object-cover w-full my-4 h-[200px]"
      />
      <button
        className={clsx(
          "px-3 py-4",
          "rounded-lg",
          "flex items-center  gap-4",
          "focus:ring-4 focus:outline-none focus:ring-violet_hover hover:bg-violet_hover"
        )}>
        <RiDeleteBin6Line size={20} />
      </button>
    </div>
  );
};

export default MyIssue;
