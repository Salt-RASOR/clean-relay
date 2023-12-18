import Link from "next/link";
import clsx from "clsx";

type NavItemProps = {
  title: string;
  href: string;
  active: boolean;
  icon: React.ReactNode;
};

const NavItem: React.FC<NavItemProps> = ({ title, href, icon, active }) => {
  return (
    <Link
      href={href}
      className={clsx(
        active ? "text-primary-color" : "text-primary_gray",
        "py-8 flex flex-col items-center"
      )}>
      <span>{icon}</span>
      <span className="text-sm md:text-base ">{title}</span>
    </Link>
  );
};

export default NavItem;
