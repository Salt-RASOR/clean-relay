import { FadeLoader } from "react-spinners";
import clsx from "clsx";

const Loader = () => {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0",
        "w-full h-full",
        "z-100  bg-bg_overlay "
      )}
    >
      <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
        <FadeLoader color="#f7ecff" />
      </div>
    </div>
  );
};

export default Loader;
