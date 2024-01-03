// UserTable.tsx

 import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { useDeleteUsers } from "../useDeleteUsers";
import UserRow from "./UserRow";
import { fetchAllUsers } from "@/services/apiUsers";




const UserTable: React.FC = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const { deleteManyUsers, isDeleting } = useDeleteUsers();
  const navigate = useNavigate();

  

  const { data: users, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });
  console.log(users);
  if (error) return <div>Error fetching users</div>;
  if (!users || users.length === 0) {
    return <div>No users available.</div>;
  }

  const pageCount = Math.ceil(users.length / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  

  
  

  const handleDeleteSelected = () => {
    deleteManyUsers(selectedUsers);
  };

  const indexOfLastUser = (currentPage + 1) * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  function handleCreateUserClick() {
    navigate("new");
  }
  

  return (
    <div className="container h-screen p-6 bg-white rounded-md shadow-md relative">
      <div className="my-4 flex justify-between">
        
        <button
          onClick={handleDeleteSelected}
          disabled={selectedUsers.length === 0 || isDeleting}
          className={`bg-red-500 text-white px-4 py-2 rounded-md ${
            selectedUsers.length === 0 && "cursor-not-allowed opacity-50"
          }`}
        >
          Delete Selected
        </button>
        <button
          onClick={handleCreateUserClick}
          className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Create User
        </button>
      </div>

      <div className=" overflow-auto pb-20">

      
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="form-checkbox h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentUsers.map((user) => (
            <UserRow user={user} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
            
          ))}
        </tbody>
      </table>
      </div>
      <div className=" flex justify-end">
        <div className="mt-4 flex justify-end">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="flex space-x-2"
            activeClassName="bg-blue-500 text-white rounded-md"
            pageClassName="bg-gray-200 text-gray-700 px-3 py-2 rounded-md"
            previousClassName="bg-gray-200 text-gray-700 px-3 py-2 rounded-md"
            nextClassName="bg-gray-200 text-gray-700 px-3 py-2 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default UserTable;
