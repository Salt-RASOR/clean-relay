import { MdOutlineReadMore } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { LiaCoinsSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";

export const MENU_LIST = [
  {
    title: "View Reports",
    href: "/",
    isDynamic: false,
    icon: <MdOutlineReadMore size={24} />,
  },
  {
    title: "New Report",
    href: "/new-report",
    isDynamic: true,
    icon: <LuPlus size={24} />,
  },
  {
    title: "Points",
    href: "/points",
    isDynamic: false,
    icon: <LiaCoinsSolid size={24} />,
  },
  {
    title: "Profile",
    href: "/profile",
    isDynamic: false,
    icon: <FiUser size={24} />,
  },
];
