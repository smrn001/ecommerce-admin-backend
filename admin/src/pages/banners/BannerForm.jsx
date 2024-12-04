import React from "react";
import toast from "react-hot-toast";

const BannerForm = ({
  isEditMode,
  setIsEditMode,
  newBanner,
  setNewBanner,
  imageFile,
  setImageFile,
  imagePreview,
  setImagePreview,
  handleCreateBanner,
  handleUpdateBanner,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", newBanner.name);
    formData.append("link", newBanner.link);
    formData.append("isActive", newBanner.isActive);
    if (imageFile) formData.append("image", imageFile);

    if (isEditMode) {
      await handleUpdateBanner(newBanner._id, formData);
      toast.success("Banner updated successfully!");
      setIsEditMode(false);
    } else {
      await handleCreateBanner(formData);
    }

    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="bg-white p-6 border w-full md:w-1/3 h-min flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {isEditMode ? "Edit Banner" : "Create a New Banner"}
      </h2>
      <div className="space-y-4 flex flex-col items-left justify-between">
        <input
          type="text"
          placeholder="Banner Name"
          value={newBanner.name}
          onChange={(e) => setNewBanner({ ...newBanner, name: e.target.value })}
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
              className="w-60 h-20 object-cover "
            />
          </div>
        )}
        <input
          type="text"
          placeholder="Link"
          value={newBanner.link}
          onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
          className="p-4 border border-gray-300 r w-full focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={newBanner.isActive}
            onChange={() =>
              setNewBanner({ ...newBanner, isActive: !newBanner.isActive })
            }
            className="mr-2"
          />
          <span className="text-gray-700">Active</span>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white p-4   hover:bg-blue-700 transition duration-200"
        >
          {isEditMode ? "Update Banner" : "Create Banner"}
        </button>
      </div>
    </div>
  );
};

export default BannerForm;
