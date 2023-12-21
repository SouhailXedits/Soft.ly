// interface ShortenedUrlProps {
//   url: {
//     id: number,
//     created_at: string,
//     longUrl: string,
//     shortUrl: string,
//     title: string
//   }
// }

import {
  BsThreeDots,
  BsFillPencilFill,
  BsBarChart,
  BsArrowReturnRight,
  BsLockFill,
  BsCalendar,
  BsTrash,
} from "react-icons/bs";

import { formatDate } from "../../../utils/helpers";
import { useState } from "react";
import CopyToClipboardButton from "../../../utils/CopyToClipBoard";
import { useDeleteLink } from "../hooks/useDeleteLink";
type QrRowProps = {
  link: {
    id: number;
    created_at: string;
    longUrl: string;
    shortUrl: string;
    title: string;
  };
  isSelected: boolean
  onSelect: (id:number) => void
};

const ShorenedUrl = ({ link, isSelected , onSelect}: QrRowProps) => {
  const [isUrlCollapsed, setIsUrlCollapsed] = useState(true);
  const { deleteL, isPending } = useDeleteLink();
  const [isOpenOptionsModal, setIsOpenOptionsModal] = useState(false);
  function toggleUrlCollapse() {
    setIsUrlCollapsed(!isUrlCollapsed);
  }

  function handleDelete() {
    deleteL(link.id);
  }

  function handleOptionsModalOpen() {
    setIsOpenOptionsModal((isOpenOptionsModal) => !isOpenOptionsModal);
  }

  const shortenedUrl = isUrlCollapsed
    ? `${link.longUrl.slice(0, 30)} ${link.longUrl.length > 30 ? "..." : ""}`
    : link.longUrl;

  return (
    <div
      className={` flex bg-white w-full px-8 py-8 gap-5 rounded-lg relative ${
        isSelected ? "border border-blue-500" : "border border-white"
      }`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(link.id)}
        className=" absolute top-3 left-3"
      />
      <div>
        <img
          className=" w-16 border border-gray-500 rounded-full"
          src="/default-favicon.png"
          alt="default favicon"
        />
      </div>
      <div className="flex flex-col justify-between items-center w-full gap-3">
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-start">
            <h1 className=" text-xl font-bold">{link.title}</h1>
            <a href={link.shortUrl} className=" text-blue-600">
              {link.shortUrl}
            </a>
          </div>
          <div className="flex flex-col">
            <div className="actions flex items-center gap-2">
              <CopyToClipboardButton text={link.shortUrl} />
              <button className="btn-icon">
                <BsFillPencilFill />
              </button>
              <div className="relative">
                <button className="btn-icon" onClick={handleOptionsModalOpen}>
                  <BsThreeDots />
                </button>
                {isOpenOptionsModal ? (
                  <div className="absolute top-[3rem] max-w-[200px] right-0  p-1 rounded shadow-md border">
                    <button
                      className="flex items-center gap-1 hover:bg-gray-100 p-2 rounded transition-all"
                      onClick={handleDelete}
                      disabled={isPending}
                    >
                      <BsTrash /> delete
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start self-start gap-1">
          <p className=" flex items-center">
            <BsArrowReturnRight /> {shortenedUrl}{" "}
            {link.longUrl.length > 30 && (
              <button
                className="ml-2 text-blue-500"
                onClick={toggleUrlCollapse}
              >
                {isUrlCollapsed ? "Show More" : "Show Less"}
              </button>
            )}
          </p>
          <div className="flex gap-7 mt-2">
            <button>
              <BsBarChart />
            </button>
            <button className="flex items-center gap-1">
              <BsLockFill /> Scan data
            </button>
            <p className="flex items-center gap-1 ">
              <BsCalendar /> {formatDate(link.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShorenedUrl;
