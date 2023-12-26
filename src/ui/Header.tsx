import { useState } from "react";
import { useUser } from "../features/auth/useUser";
import { logout } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const navigate = useNavigate(); 
  const queryClient = useQueryClient()

  const [showProfileModal, setShowProfileModal] = useState(false)
  const { user } = useUser();
  const firstLetter = user?.email?.charAt(0)?.toUpperCase();
  function handleShowProfileModal() {
    setShowProfileModal(showProfileModal => !showProfileModal);
  }
  async function handleLogout() {
    await logout();
    queryClient.setQueryData(["user"], null);
    navigate("/login");
  }
  
  return (
    <div className="col-start-2 border-b border-gray-100 flex justify-end px-2 py-1">
      <div className=" relative">
        <button onClick={handleShowProfileModal}  className="bg-green-900 p-5 rounded-full h-5 w-5 flex items-center justify-center" >
          <span className=" text-3xl text-white">{firstLetter}</span>
        </button>
        {showProfileModal ? <div className=" absolute top-[50px] right-3 border shadow-md p-2 rounded transition-all bg-white" >
          <button onClick={handleLogout} className="rounded p-2 hover:bg-gray-200">Logout</button>
        </div> : ''}
      </div>
    </div>
  );
}
