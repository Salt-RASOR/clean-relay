import Link from "next/link";

type NavItemProps = {
  title: string;
  href: string;
  active: boolean;
};
const NavItem: React.FC<NavItemProps> = ({ title, href, active }) => {
  return (
    <Link href={href} className={`nav__item ${active ? "active" : ""}`}>
      {title}
    </Link>
  );
};

export default NavItem;
