"use client";
import NavItem from "./NavItem";
import clsx from "clsx";
import { MENU_LIST } from "@/app/common/routes";

const Navbar = () => {
  return (
    <nav
      className={clsx(
        "border border-solid border-stroke_color rounded-b-[20px] bg-white",
        "flex justify-center ",
        "fixed bottom-0 w-full",
        "z-10"
      )}>
      <div className={clsx("flex gap-8 md:gap-16")}>
        {MENU_LIST.map((menuItems, idx) => (
          <NavItem {...menuItems} key={idx} />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
