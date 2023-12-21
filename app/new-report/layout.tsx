import { FC, PropsWithChildren } from "react";

const layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center background-container bg-violet px-2 md:px-20 lg:px-40 pb-[120px]">
      {children}
    </div>
  );
};

export default layout;
