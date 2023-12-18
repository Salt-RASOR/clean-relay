"use client";
import { useState } from "react";
import NavItem from "./NavItem";
import clsx from "clsx";
import { MdOutlineReadMore } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { LiaCoinsSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";

const MENU_LIST = [
  { title: "View Reports", href: "/", icon: <MdOutlineReadMore size={24} /> },
  { title: "New Report", href: "/report", icon: <LuPlus size={24} /> },
  { title: "Points", href: "/points", icon: <LiaCoinsSolid size={24} /> },
  { title: "Profile", href: "/profile", icon: <FiUser size={24} /> },
];

const Navbar = () => {
  const [navActive, setNavActive] = useState<null | boolean>(null);
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  return (
    <header>
      <nav
        className={clsx(
          "border border-solid border-stroke_color rounded-b-[20px]",
          "flex justify-center ",
          "fixed bottom-0 w-full"
        )}>
        <div
          className={clsx("flex gap-4 md:gap-16")}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.title}>
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
