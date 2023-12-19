import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAppSelector } from "@/lib/hooks";
import { selectProcessLink } from "@/lib/features/newReportSlice";

type NavItemProps = {
  title: string;
  href: string;
  icon: React.ReactNode;
  isDynamic: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ title, href, icon, isDynamic }) => {
  const pathname = usePathname();

  const processLink = useAppSelector(selectProcessLink);

  if (isDynamic) {
    href += processLink;
  }

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
