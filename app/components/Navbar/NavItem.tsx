import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavItemProps = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const NavItem: React.FC<NavItemProps> = ({ title, href, icon }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={clsx(
        pathname === href ? "text-primary-color" : "text-primary_gray",
        "py-8 flex flex-col items-center"
      )}
    >
      <span>{icon}</span>
      <span className="text-sm md:text-base ">{title}</span>
    </Link>
  );
};

export default NavItem;
