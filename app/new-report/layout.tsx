import { FC, PropsWithChildren } from "react";

const layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center background-container bg-violet">
      {children}
    </div>
  );
};

export default layout;
