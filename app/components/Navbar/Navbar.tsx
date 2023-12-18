"use client";
import { useState } from "react";
import Link from "next/link";
import NavItem from "./NavItem";

const MENU_LIST = [
  { title: "View Reports", href: "/" },
  { title: "New Report", href: "/report" },
  { title: "Points", href: "/points" },
  { title: "Profile", href: "/profile" },
];

const Navbar = () => {
  const [navActive, setNavActive] = useState<null | boolean>(null);
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  return (
    <header>
      <nav className={`nav`}>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
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
