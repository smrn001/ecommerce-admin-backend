import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import useUsers from "../../hooks/useUsers"; // Import the custom hook
import UserForm from "./UserForm";
import UserList from "./UserList";

const Users = () => {
  const {
    users,
    loading,
    error,
    newUser,
    setNewUser,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
  } = useUsers(); // Use the custom hook for users

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditUser = (user) => {
    setNewUser({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setIsEditMode(true);
  };

  const confirmDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      handleDeleteUser(id);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Toaster />
      <h1 className="text-4xl font-semibold text-center mb-8 text-black">
        User Management
      </h1>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <UserForm
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            newUser={newUser}
            setNewUser={setNewUser}
            handleCreateUser={handleCreateUser}
            handleUpdateUser={handleUpdateUser}
          />
          <UserList
            users={users}
            onEdit={handleEditUser}
            onDelete={confirmDeleteUser}
          />
        </div>
      )}
    </div>
  );
};

export default Users;