import { useEffect, useRef, useState } from "react";
import {
  BsBarChart,
  BsCardText,
  BsChevronLeft,
  BsChevronRight,
  BsLayoutTextWindow,
  BsLink45Deg,
  BsPlusLg,
  BsQrCodeScan,
  BsX,
} from "react-icons/bs";
import Logo from "../Logo/Logo";
import NavigLink from "../buttons/NavigLink";
import { useUser } from "../../features/auth/useUser";
//import { useHistory } from "react-router-dom";

interface SideBarProps {
  onToggleOpen: () => void;
}

function SideBar({ onToggleOpen }: SideBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { role } = useUser();
  //const history = useHistory();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const isClickedOutsideModal =
        showModalCreate &&
        modalRef.current &&
        !modalRef.current.contains(event.target as HTMLElement | null);

      if (isClickedOutsideModal) {
        setShowModalCreate(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModalCreate]);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth >= 767 && window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleShowModalCreate = () => {
    setShowModalCreate((prev) => !prev);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleLinkClick = () => {
    setIsCollapsed(true);
    onToggleOpen();
  };

  return (
    <div
      className={`transition-all ${
        isCollapsed ? "w-12" : "w-64"
      } flex flex-col gap-5 relative md:w-full`}
    >
      <button
        className="absolute -right-5 top-6 rounded-full bg-white shadow-black border shadow-sm p-1.5 text-sm md:hidden"
        onClick={() => setIsCollapsed((prevCollapsed) => !prevCollapsed)}
      >
        {isCollapsed ? <BsChevronRight /> : <BsChevronLeft />}
      </button>
      <Logo isCollapsed={isCollapsed} />
      <button
        onClick={onToggleOpen}
        className="text-3xl absolute top-2 right-2 hidden md:block"
      >
        <BsX />
      </button>

      <div ref={modalRef} className="relative">
        <button
          className="btn-primary w-full text-white"
          onClick={handleShowModalCreate}
        >
          {!isCollapsed ? "Create New" : <BsPlusLg />}
        </button>
        {showModalCreate && (
          <div
            className="bg-white shadow-sm border md:static absolute top-0 -right-[210px] p-3 rounded z-30"
            onClick={handleModalClick}
          >
            <NavigLink path="/links/create" onClick={handleLinkClick}>
              <BsLink45Deg /> Create link
            </NavigLink>
            <NavigLink path="/qrcodes/create" onClick={handleLinkClick}>
              <BsQrCodeScan /> Create Qr Code
            </NavigLink>
          </div>
        )}
      </div>
      <div className="border-y border-gray-300 flex flex-col gap-2 py-3">
        <NavigLink path="/" onClick={handleLinkClick}>
          <BsLayoutTextWindow /> {!isCollapsed ? "Home" : ""}
        </NavigLink>
        <NavigLink path="/links" onClick={handleLinkClick}>
          <BsLink45Deg /> {!isCollapsed ? "Links" : ""}
        </NavigLink>
        <NavigLink path="/qrcodes" onClick={handleLinkClick}>
          <BsQrCodeScan /> {!isCollapsed ? "Qr Code" : ""}
        </NavigLink>
        {role === "admin" && (
          <NavigLink path="/create-user" onClick={handleLinkClick}>
            <BsCardText /> {!isCollapsed ? "Users" : ""}
          </NavigLink>
        )}
        <NavigLink path="/analytics" onClick={handleLinkClick}>
          <BsBarChart /> {!isCollapsed ? "Analytics" : ""}
        </NavigLink>
      </div>
    </div>
  );
}

export default SideBar;
