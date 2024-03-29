import {
  BsThreeDots,
  // BsFillPencilFill,
  BsBarChart,
  BsArrowReturnRight,
  BsCalendar,
  BsTrash,
  BsLink,
  BsFillPencilFill,
  BsX,
} from "react-icons/bs";

import { formatDate } from "../../../utils/helpers";
import { useEffect, useRef, useState } from "react";
import CopyToClipboardButton from "../../../utils/CopyToClipBoard";
import { useDeleteLink } from "../hooks/useDeleteLink";
import { Link } from "react-router-dom";
import { shortenedUrlProps } from "../../../types/links";
import EditLinkForm from "../hooks/EditLinkForm";

const ShortenedUrl = ({ link, isSelected, onSelect }: shortenedUrlProps) => {
  const [isUrlCollapsed, setIsUrlCollapsed] = useState(true);
  const { deletLink, isPending } = useDeleteLink();
  const [isOpenOptionsModal, setIsOpenOptionsModal] = useState(false);
  function toggleUrlCollapse() {
    setIsUrlCollapsed(!isUrlCollapsed);
  }

  function handleDelete() {
    deletLink(String(link.id));
  }

  const handleOptionsModalOpen = () => {
    setIsOpenOptionsModal((prevIsOpen) => !prevIsOpen);
  };

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as HTMLElement | null)
      ) {
        setIsOpenOptionsModal(false);
      }
    };
    if (isOpenOptionsModal) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpenOptionsModal]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const editmodalRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        editmodalRef.current &&
        !editmodalRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const shortenedUrl = isUrlCollapsed
    ? `${link.longUrl.slice(0, 30)} ${link.longUrl.length > 30 ? "..." : ""}`
    : link.longUrl;

  const { tags: allTags } = link;
  const transformedTags = allTags.map((item: any) => ({
    ...item,
    value: item.id, // Replace the value property with the id property
  }));
  const transformedData = { ...link, tags: transformedTags };

  return (
    <div
      className={` flex sm:flex-col bg-white w-full px-8 py-8 gap-5 rounded-lg relative ${
        isSelected ? "border border-blue-500" : "border border-white"
      }`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(link.id)}
        className=" absolute top-3 left-3"
      />
      <div className=" sm:self-center">
        <img
          className=" min-w-[50px] max-w-[50px]  "
          src={link.iconFilePath}
          alt="default favicon"
        />
      </div>
      <div className="flex flex-col justify-between items-center w-full gap-3">
        <div className="flex justify-between w-full gap-2">
          <div className="flex flex-col items-start">
            <h1 className=" text-xl font-bold">{link.title}</h1>
            <a
              href={link.shortUrl}
              className=" text-blue-600 break-all"
              target="_blank"
            >
              {link.shortUrl}
            </a>
          </div>
          <div className="flex flex-col">
            <div className="actions flex items-center gap-2">
              <CopyToClipboardButton text={link.shortUrl} />
              <button className="btn-icon" onClick={handleEditClick}>
                <BsFillPencilFill />
              </button>

              {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                  <div
                    ref={editmodalRef}
                    className="bg-white p-6 rounded-lg relative"
                  >
                    <EditLinkForm
                      oldData={transformedData}
                      setIsModalOpen={setIsModalOpen}
                    />
                    <button
                      className=" absolute top-4 right-4 text-3xl"
                      onClick={() => setIsModalOpen(false)}
                    >
                      <BsX />
                    </button>
                  </div>
                </div>
              )}
              <div className="relative" ref={modalRef}>
                <button
                  className="btn-icon sm:p-3 p-4"
                  onClick={handleOptionsModalOpen}
                >
                  <BsThreeDots />
                </button>
                {isOpenOptionsModal ? (
                  <div className="absolute top-[3rem] w-[182px] right-0  p-1 rounded shadow-md border bg-white flex flex-col">
                    <button
                      className="flex items-center gap-1 hover:bg-gray-100 p-2 rounded transition-all"
                      onClick={handleDelete}
                      disabled={isPending}
                    >
                      <BsTrash /> delete
                    </button>
                    <Link
                      className="flex items-center gap-1 p-2 transition-all rounded hover:bg-gray-100"
                      to={`/link-details?id=${link.id}`}
                      state={{ linkData: link } as { linkData: typeof link }}
                    >
                      <BsLink /> View link details
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start self-start gap-1">
          <p className=" flex items-center break-all">
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
            <button className=" flex items-center gap-2">
              <BsBarChart /> Engagments : {link.totalRequestCount}
            </button>

            <div className=" flex items-center gap-1">
              <span className=" break-keep">tags :</span>
              <div className=" max-w-[400px] flex gap-1 flex-wrap">
                {link.tags?.map((tag: any) => (
                  <p key={tag.id} className=" bg-stone-200 px-1 rounded">
                    {tag.label}
                  </p>
                ))}
              </div>
            </div>

            <p className="flex items-center gap-1 ">
              <BsCalendar /> {formatDate(link.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortenedUrl;
