import { downloadfile } from "../../../utils/helpers";
import {
  BsThreeDots,
  BsDownload,
  // BsFillPencilFill,
  // BsPalette,
  BsBarChart,
  BsArrowReturnRight,
  BsCalendar,
  BsTrash,
} from "react-icons/bs";

import { formatDate } from "../../../utils/helpers";
import { useEffect, useRef, useState } from "react";
import { useDeleteQR } from "../hooks/useDeleteQr";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { QrRowProps } from "@/types/analytics";

const QrRow = ({ qr }: QrRowProps) => {
  const [isUrlCollapsed, setIsUrlCollapsed] = useState(true);
  const { deleteQr, isPending } = useDeleteQR();
  const [isOpenOptionsModal, setIsOpenOptionsModal] = useState(false);

  function handleDelete() {
    deleteQr(String(qr.id));
  }

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as HTMLElement | null)
      ) {
        // Click outside the modal, close the modal
        setIsOpenOptionsModal(false);
      }
    };

    // Attach the event listener when the modal is open
    if (isOpenOptionsModal) {
      document.addEventListener("click", handleOutsideClick);
    }

    // Detach the event listener when the component unmounts or when the modal is closed
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpenOptionsModal]);

  const imageUrl = qr.qr_image_svg;

  function toggleUrlCollapse() {
    setIsUrlCollapsed(!isUrlCollapsed);
  }

  function handleDownload() {
    downloadfile(imageUrl);
    toast.success("We've got your QR code for your volt! 😉");
  }
  function handleOptionsModalOpen() {
    setIsOpenOptionsModal((isOpenOptionsModal) => !isOpenOptionsModal);
  }
  const shortenedUrl = isUrlCollapsed
    ? `${qr.longUrl.slice(0, 30)} ${qr.longUrl.length > 30 ? "..." : ""}`
    : qr.longUrl;

  return (
    <div className=" flex sm:flex-col bg-white w-full p-8 sm:p-4 gap-5 rounded-lg">
      <div className=" self-center">
        <img
          className=" w-32 border border-gray-500 rounded-md min-w-[125px]"
          src={qr.qr_image_url}
          alt="qr code image"
        />
      </div>
      <div className="flex flex-col justify-between items-center w-full gap-5">
        <div className="flex justify-between w-full gap-1 sm:flex-col-reverse items-center">
          <div className="flex flex-col items-start">
            <h1 className=" text-xl font-bold">{qr.title}</h1>
            <p>Website</p>
          </div>
          <div className="flex flex-col">
            <div className="actions flex items-center gap-2">
              <div className="relative" ref={modalRef}>
                <button className="btn-icon" onClick={handleOptionsModalOpen}>
                  <BsThreeDots />
                </button>
                {isOpenOptionsModal ? (
                  <div className="absolute top-[3rem] w-[182px] right-0  p-3 rounded shadow-md border flex flex-col bg-white">
                    <button
                      className="flex items-center gap-1 hover:bg-gray-100 p-2 rounded transition-all w-full"
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
              {/* <button className="btn-icon">
                <BsPalette />
              </button>
              <button className="btn-icon">
                <BsFillPencilFill />
              </button> */}
              <button onClick={handleDownload} className="btn-icon">
                <BsDownload />
              </button>

              <Link
                to={`/link-details?id=${qr.id}`}
                className="btn-primary bg-gray-100 text-black flex items-center gap-1"
              >
                {" "}
                <BsBarChart /> <span className=" sm:hidden">View</span> details
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start self-start gap-1">
          <p className=" flex items-center break-all">
            <BsArrowReturnRight /> {shortenedUrl}{" "}
            {qr.longUrl.length > 30 && (
              <button
                className="ml-2 text-blue-500 break-keep"
                onClick={toggleUrlCollapse}
              >
                {isUrlCollapsed ? "Show More" : "Show Less"}
              </button>
            )}
          </p>
          <div className="flex gap-7 mt-2">
            <button className=" flex items-center gap-2">
              <BsBarChart /> Engagments : {qr.totalRequestCount}
            </button>
            {/* <button className="flex items-center gap-1">
              <BsLockFill /> Scan data
            </button> */}
            {/* <p>{qr?.totalRequestCount}</p> */}
            <p className="flex items-center gap-1">
              <BsCalendar /> {formatDate(qr.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrRow;
