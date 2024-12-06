import React, { useState } from "react";
import  { Toaster } from "react-hot-toast";
import useAdmins from "../../hooks/useAdmins";
import AdminForm from "./AdminForm";
import AdminList from "./AdminList";

const Admin = () => {
  const {
    admins,
    loading,
    error,
    newAdmin,
    setNewAdmin,
    handleCreateAdmin,
    handleUpdateAdmin,
    handleDeleteAdmin,
  } = useAdmins();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditAdmin = (admin) => {
    setNewAdmin({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
 
    });
    setImageFile(null);
    setIsEditMode(true);
    setImagePreview(admin.image);
  };

  const confirmDeleteAdmin = (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      handleDeleteAdmin(id);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Toaster />
      <h1 className="text-4xl font-semibold text-center mb-8 text-black">
        Admins Management
      </h1>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <AdminForm
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            newAdmin={newAdmin}
            setNewAdmin={setNewAdmin}
            imageFile={imageFile}
            setImageFile={setImageFile}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            handleCreateAdmin={handleCreateAdmin}
            handleUpdateAdmin={handleUpdateAdmin}
          />
          <AdminList
            admins={admins}
            onEdit={handleEditAdmin}
            onDelete={confirmDeleteAdmin}
          />
        </div>
      )}
    </div>
  );
};

export default Admin;
