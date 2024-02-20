import { NavLink } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

function NavigLink({
  path,
  children,
  onClick,
}: {
  path: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const baseNavLink = (
    <NavLink
      className="px-4 py-2 hover:hover-style rounded-sm flex items-center gap-2 whitespace-nowrap"
      to={path}
    >
      {children}

    </NavLink>
  );

  return isMobile ? (
    <NavLink
      className="px-4 py-2 hover:hover-style rounded-sm flex items-center gap-2 whitespace-nowrap"
      to={path}
      onClick={onClick}
    >
      {children}
    </NavLink>
  ) : (
    baseNavLink
  );
}

export default NavigLink;
