import React, { useState } from "react";


interface User {
  id: string;
  role: string;
  email: string;
}
interface EditUserModalProps {
    user: User
  onClose: () => void;
  onEdit: (data: {password?: string, role: string}) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
    user,
    onClose,
    onEdit,
}) => {
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(user.role);
    const isPasswordValid = password.length >= 8 || password === ''; 

    const handleEdit = () => {
        
        
        // Validate form data if needed
        
        // Call the onEdit callback with the userId and form data
        onEdit({ password, role });
        
        // Close the modal
        onClose();
    };

    return (
        <div className="fixed h-screen w-screen top-0 left-0 z-10 bg-gray-500/5 flex justify-center items-center backdrop-filter backdrop-blur-sm">
            <div className="modal bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Edit User</h2>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password(optional):
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Role:
                    </label>

                    <select
                        value={role}
                        name="role"
                        id="role"
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 p-2 border rounded-md w-full"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={handleEdit}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-stone-500 disabled:opacity-60"
                        disabled={!isPasswordValid}
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
