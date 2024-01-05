import Image from "next/image";
import logo from "@/app/public/logo.svg";

type LogoPropps = {
  clickHandler?: () => void;
};

const Logo: React.FC<LogoPropps> = ({ clickHandler }) => {
  const handleClick = () => {
    clickHandler && clickHandler();
  };
  return (
    <Image
      src={logo}
      alt={"logo"}
      width={100}
      height={40}
      onClick={handleClick}
      className="cursor-pointer"
    />
  );
};

export default Logo;
