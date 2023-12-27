import { NavLink } from "react-router-dom";

function NavigLink({
  path,
  children,
  onClick,
}: {
  path: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <NavLink
      className="px-4 py-2 hover:hover-style rounded-sm flex items-center gap-2 whitespace-nowrap"
      to={path}
      onClick={handleClick}
    >
      {children}
    </NavLink>
  );
}

export default NavigLink;
