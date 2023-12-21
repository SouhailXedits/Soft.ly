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
import {CiFolderOn, CiSettings} from 'react-icons/ci'
import Logo from "../Logo/Logo";
import NavigLink from "../buttons/NavigLink";
import { useState } from "react";


function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleCollapse() {
    setIsCollapsed((prevCollapsed) => !prevCollapsed);
  }

  return (
    <div
      className={`transition-all ${
        isCollapsed ? "w-12" : "w-64" /* Adjust the width as needed */
      } flex flex-col gap-5 relative`}
    >
      <button
        className="absolute -right-5 top-6 rounded-full bg-white shadow-black border shadow-sm p-1.5 text-sm"
        onClick={handleCollapse}
      >
        {isCollapsed ? <BsChevronRight /> : <BsChevronLeft />}
      </button>
      <Logo />
      <button className="btn-primary w-full text-white">
        {!isCollapsed ? "Create New" : <BsPlusLg />}
      </button>
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
        <NavigLink path="/link-in-bio">
          <BsCardText /> {!isCollapsed ? "Link in bio" : ""}
        </NavigLink>
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
