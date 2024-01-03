import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDeleteUsers } from "../useDeleteUsers";
import EditUserModal from "./EditModal";
import { useUpdateUser } from "../useUpdateUser";
import { useUser } from "../../useUser";


interface User {
  id: string;
  role: string;
  email: string;
}

interface UserRowProps {
  user: User;
  selectedUsers: string[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
}

function UserRow({ user, selectedUsers, setSelectedUsers }: UserRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { deleteManyUsers, isDeleting } = useDeleteUsers();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {updateUser} = useUpdateUser()


  const modalRef = useRef<HTMLDivElement | null>(null);
  console.log(modalRef);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as HTMLElement | null)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isModalOpen]);
  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const openModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    deleteManyUsers([selectedUserId!]);
    closeModal();
  };

  const handleEdit = (userId: string) => {
    console.log(userId)
    setIsEditModalOpen(true);
    closeModal();
  };



  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  const {id: userId } = user


  const handleSaveEdit = async (data: { password?: string; role: string }) => {
    try {
      const newData: { [key: string]: string } = {};

      if (data.password !== undefined && data.password !== "") {
        newData.password = data.password;
      }

      newData.role = data.role;

      console.log({ id: userId, ...newData });
      updateUser({ id: userId, ...newData });



      // Close the modal
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const {user: curUser} = useUser();
  const isCurrentUser = curUser?.id === userId;


  return (
    <tr key={user.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={selectedUsers.includes(user.id)}
          onChange={() => toggleSelectUser(user.id)}
          className="form-checkbox h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
      <td className="px-6 py-4 whitespace-nowrap relative">
        <div className="inline-block" ref={modalRef}>
          <button
            onClick={() => openModal(user.id)}
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            id={`options-menu-${user.id}`}
            aria-haspopup="true"
            aria-expanded="true"
          >
            <BsThreeDots />
          </button>

          {isModalOpen && selectedUserId === user.id && (
            <div className="absolute left-0 mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div
                className="py-1 flex flex-col min-w-[70px]"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby={`options-menu-${user.id}`}
              >
                
                { isCurrentUser ? '' : 
                  <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Delete
                </button> 
                }
                <button
                  onClick={() => handleEdit(user.id)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      {isEditModalOpen && (
        <EditUserModal
          user = {user}
          onClose={handleCloseEditModal}
          onEdit={handleSaveEdit}
        />
      )}
      </td>
      
    </tr>
  );
}

export default UserRow
