import React from "react";
import toast from "react-hot-toast";

const AdminForm = ({
  isEditMode,
  setIsEditMode,
  newAdmin,
  setNewAdmin,
  imageFile,
  setImageFile,
  imagePreview,
  setImagePreview,
  handleCreateAdmin,
  handleUpdateAdmin
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", newAdmin.name);
    formData.append("email", newAdmin.email);
    if (imageFile) formData.append("image", imageFile);

    if (isEditMode) {
      await handleUpdateAdmin(newAdmin._id, formData);
      toast.success("Admin updated successfully!");
      setIsEditMode(false);
    } else {
      await handleCreateAdmin(formData);
    }

    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="bg-white p-6 border w-full md:w-1/3 h-min flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {isEditMode ? "Edit Admin" : "Create a New Admin"}
      </h2>
      <div className="space-y-4 flex flex-col items-left justify-between">
        <input
          type="text"
          placeholder="Admin Name"
          value={newAdmin.name}
          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
          className="p-4 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="p-4 border border-gray-300  w-full focus:ring-2 focus:ring-blue-500"
        />
        {imagePreview && (
          <div className="mt-4 flex justify-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-28 h-28 object-cover "
            />
          </div>
        )}
        <input
          type="email"
          placeholder="email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          className="p-4 border border-gray-300 r w-full focus:ring-2 focus:ring-blue-500"
        />
      
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white p-4   hover:bg-blue-700 transition duration-200"
        >
          {isEditMode ? "Update Admin" : "Create Admin"}
        </button>
      </div>
    </div>
  );
};

export default AdminForm;
