import { downloadfile } from "../../../utils/helpers";
import {
  BsThreeDots,
  BsDownload,
  BsFillPencilFill,
  BsPalette,
  BsBarChart,
  BsArrowReturnRight,
  BsLockFill,
  BsCalendar,
  BsTrash,
} from "react-icons/bs";

import { formatDate } from "../../../utils/helpers";
import { useEffect, useRef, useState } from "react";
import { useDeleteQR } from "../hooks/useDeleteQr";
type QrRowProps = {
  qr: {
    id: string;
    created_at: string;
    qr_image_url: string;
    longUrl: string;
    title: string;
  };
};

const QrRow = ({ qr }: QrRowProps) => {
  const [isUrlCollapsed, setIsUrlCollapsed] = useState(true);
  const { deleteQr, isPending } = useDeleteQR();
  const [isOpenOptionsModal, setIsOpenOptionsModal] = useState(false);


  function handleDelete() {
    deleteQr(qr.id);
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

  const imageUrl = qr.qr_image_url;

  function toggleUrlCollapse() {
    setIsUrlCollapsed(!isUrlCollapsed);
  }

  function handleDownload() {
    downloadfile(imageUrl);
  }
  function handleOptionsModalOpen() {
    setIsOpenOptionsModal((isOpenOptionsModal) => !isOpenOptionsModal);
  }
  const shortenedUrl = isUrlCollapsed
    ? `${qr.longUrl.slice(0, 30)} ${qr.longUrl.length > 30 ? "..." : ""}`
    : qr.longUrl;

  return (
    <div className=" flex bg-white w-full px-8 py-8 gap-5 rounded-lg">
      <div>
        <img
          className=" w-32 border border-gray-500 rounded-md"
          src={qr.qr_image_url}
          alt="qr code image"
        />
      </div>
      <div className="flex flex-col justify-between items-center w-full">
        <div className="flex justify-between w-full">
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
                  <div className="absolute top-[3rem] max-w-[200px] right-0  p-3 rounded shadow-md border">
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
              <button className="btn-icon">
                <BsPalette />
              </button>
              <button className="btn-icon">
                <BsFillPencilFill />
              </button>
              <button onClick={handleDownload} className="btn-icon">
                <BsDownload />
              </button>
              <button className="btn-primary bg-gray-100 text-black flex items-center gap-1">
                {" "}
                <BsBarChart /> View details
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start self-start gap-1">
          <p className=" flex items-center">
            <BsArrowReturnRight /> {shortenedUrl}{" "}
            {qr.longUrl.length > 30 && (
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
