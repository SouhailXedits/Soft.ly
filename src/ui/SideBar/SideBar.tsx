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
} from "react-icons/bs";
import { CiFolderOn, CiSettings } from "react-icons/ci";
import Logo from "../Logo/Logo";
import NavigLink from "../buttons/NavigLink";
import { useUser } from "../../features/auth/useUser";

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { role } = useUser();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        showModalCreate &&
        modalRef.current &&
        !modalRef.current.contains(event.target as HTMLElement | null)
      ) {
        setShowModalCreate(false);
      }
    };

    document.addEventListener("mouseup", handleOutsideClick);

    return () => {
      document.removeEventListener("mouseup", handleOutsideClick);
    };
  }, [showModalCreate]);

  const handleShowModalCreate = () => {
    setShowModalCreate((prev) => !prev);
  };

  return (
    <div
      className={`transition-all ${
        isCollapsed ? "w-12" : "w-64"
      } flex flex-col gap-5 relative`}
    >
      <button
        className="absolute -right-5 top-6 rounded-full bg-white shadow-black border shadow-sm p-1.5 text-sm"
        onClick={() => setIsCollapsed((prevCollapsed) => !prevCollapsed)}
      >
        {isCollapsed ? <BsChevronRight /> : <BsChevronLeft />}
      </button>
      <Logo isCollapsed={isCollapsed} />
      <div className="relative">
        <button
          className="btn-primary w-full text-white"
          onClick={handleShowModalCreate}
        >
          {!isCollapsed ? "Create New" : <BsPlusLg />}
        </button>
        {showModalCreate && (
          <div
            className=" bg-white shadow-sm border absolute top-0 -right-[200px] p-3 rounded z-30"
            ref={modalRef}
          >
            <NavigLink path="/links/create" >
              {/* <BsLink45Deg /> {!isCollapsed ? "Create link" : ""} */}
              <BsLink45Deg /> Create link
            </NavigLink>
            <NavigLink path="/qrcodes/create">
              <BsQrCodeScan /> Create Qr Code
              {/* <BsQrCodeScan /> {!isCollapsed ? "Create Qr Code" : ""} */}
            </NavigLink>
          </div>
        )}
      </div>
      <div className="border-y border-gray-300 flex flex-col gap-2 py-3">
        <NavigLink path="/">
          <BsLayoutTextWindow /> {!isCollapsed ? "Home" : ""}
        </NavigLink>
        <NavigLink path="/links">
          <BsLink45Deg /> {!isCollapsed ? "Links" : ""}
        </NavigLink>
        <NavigLink path="/qrcodes">
          <BsQrCodeScan /> {!isCollapsed ? "Qr Code" : ""}
        </NavigLink>
        {role === "admin" && (
          <NavigLink path="/create-user">
            <BsCardText /> {!isCollapsed ? "Create user" : ""}
          </NavigLink>
        )}
        <NavigLink path="/analytics">
          <BsBarChart /> {!isCollapsed ? "Analytics" : ""}
        </NavigLink>
        <NavigLink path="/campains">
          <CiFolderOn /> {!isCollapsed ? "Campaigns" : ""}
        </NavigLink>
      </div>
      <NavigLink path="/settings">
        <CiSettings /> {!isCollapsed ? "Settings" : ""}
      </NavigLink>
    </div>
  );
}

export default SideBar;
