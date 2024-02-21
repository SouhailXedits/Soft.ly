import { useEffect, useRef, useState } from "react";
import { useUser } from "../features/auth/useUser";
import { logout } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { BsJustify } from "react-icons/bs";

interface SideBarProps {
  onToggleOpen: () => void;
}

export default function Header({ onToggleOpen }: SideBarProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user } = useUser();
  const firstLetter = user?.email?.charAt(0)?.toUpperCase();
  const handleShowProfileModal = () => {
    setShowProfileModal((prevIsOpen) => !prevIsOpen);
  };

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as HTMLElement | null)
      ) {
        setShowProfileModal(false);
      }
    };
    if (showProfileModal) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showProfileModal]);
  async function handleLogout() {
    await logout();
    queryClient.setQueryData(["user"], null);
    navigate("/login");
  }

  return (
    <div className="col-start-2 border-b border-gray-100 flex justify-between px-2 py-1">
      <div className="md:flex items-center gap-2 hidden">
        <button onClick={onToggleOpen} className=" text-xl">
          <BsJustify />
        </button>
        <img className=" h-9" src="/logo.png" alt="sofly.link logo" />
      </div>
      <div ref={modalRef} className=" relative flex justify-end w-full">
        <button
          onClick={handleShowProfileModal}
          className="bg-blue-600 mr-3 p-5 rounded-full h-5 w-5 flex items-center justify-center sm:h-3 sm:w-3 sm:p-4"
        >
          <span className=" text-3xl sm:text-xl text-white">{firstLetter}</span>
        </button>
        {showProfileModal ? (
          <div className=" absolute top-[50px] right-3 border shadow-md p-2 rounded transition-all bg-white z-50">
            <button
              onClick={handleLogout}
              className="rounded p-2 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
