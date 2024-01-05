import { MdOutlineArrowBackIos } from "react-icons/md";

type BackButtonProps = {
  redirectToHome: () => void;
};
const BackButton: React.FC<BackButtonProps> = ({ redirectToHome }) => {
  const handleClick = () => {
    redirectToHome && redirectToHome();
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex items-center pl-2 pr-4 py-2 text-sm text-gray-700 rounded-lg transition-colors duration-200 bg-white gap-x-2 sm:w-auto hover:bg-gray-100">
      <MdOutlineArrowBackIos />

      <span>Go back</span>
    </button>
  );
};

export default BackButton;
