import { MdOutlineReadMore } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { LiaCoinsSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";

export const MENU_LIST = [
  {
    title: "Reports",
    href: "/",
    icon: <MdOutlineReadMore size={24} />,
  },
  {
    title: "New",
    href: "/new-report/information",
    icon: <LuPlus size={24} />,
  },
  {
    title: "Points",
    href: "/points",
    icon: <LiaCoinsSolid size={24} />,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: <FiUser size={24} />,
  },
];
