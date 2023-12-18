"use client";
import NavItem from "./NavItem";
import clsx from "clsx";
import { MENU_LIST } from "@/app/common/routes";

const Navbar = () => {
  return (
    <nav
      className={clsx(
        "border border-solid border-stroke_color rounded-b-[20px]",
        "flex justify-center ",
        "fixed bottom-0 w-full"
      )}>
      <div className={clsx("flex gap-4 md:gap-16")}>
        {MENU_LIST.map((menuItems, idx) => (
          <NavItem {...menuItems} key={idx} />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
