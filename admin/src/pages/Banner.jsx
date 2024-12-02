import React, { useState, useEffect } from 'react';
import useBanners from '../hooks/useBanners';

const Banner = () => {
  const {
    banners,
    loading,
    error,
    newBanner,
    setNewBanner,
    handleCreateBanner,
    handleUpdateBanner,
    handleDeleteBanner,
  } = useBanners();

  // State to hold the selected image file
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State to hold image preview
  const [isEditMode, setIsEditMode] = useState(false); // Track if in edit mode

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setImageFile(file);
    // Generate a preview URL for the selected file
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Create FormData for banner
  const handleCreateBannerWithFile = async () => {
    const formData = new FormData();
    formData.append('name', newBanner.name);
    formData.append('link', newBanner.link);
    formData.append('isActive', newBanner.isActive);
    if (imageFile) {
      formData.append('image', imageFile); // Append the image file
    }

    // Call the create function
    await handleCreateBanner(formData);
  };

  // Edit banner and set form data
  const handleEditBanner = (banner) => {
    setNewBanner({
      _id: banner._id,  // Add _id to the form state
      name: banner.name,
      link: banner.link,
      isActive: banner.isActive,
    });
    setImageFile(null); // Reset file input (you may add functionality to preview the old image)
    setIsEditMode(true); // Switch to edit mode
    setImagePreview(banner.image); // Set the current banner image as preview
  };

  // Handle update banner with file
  const handleUpdateBannerWithFile = async () => {
    const formData = new FormData();
    formData.append('name', newBanner.name);
    formData.append('link', newBanner.link);
    formData.append('isActive', newBanner.isActive);
    if (imageFile) {
      formData.append('image', imageFile); // Append the image file
    }

    // Pass the banner's _id for updating the correct banner
    await handleUpdateBanner(newBanner._id, formData);
    setIsEditMode(false); // Reset to create mode after update
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-xl">
      <h1 className="text-4xl font-semibold text-center mb-8 text-blue-600">Banner Management</h1>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          {/* Left Section - Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 w-full md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {isEditMode ? 'Edit Banner' : 'Create a New Banner'}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Banner Name"
                value={newBanner.name}
                onChange={(e) => setNewBanner({ ...newBanner, name: e.target.value })}
                className="p-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="p-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              {imagePreview && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-60 h-20 object-cover rounded-lg"
                  />
                </div>
              )}
              <input
                type="text"
                placeholder="Link"
                value={newBanner.link}
                onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
                className="p-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newBanner.isActive}
                  onChange={() => setNewBanner({ ...newBanner, isActive: !newBanner.isActive })}
                  className="mr-2"
                />
                <span className="text-gray-700">Active</span>
              </div>
              <button
                onClick={isEditMode ? handleUpdateBannerWithFile : handleCreateBannerWithFile} // Handle update or create
                className="bg-blue-600 text-white p-4 rounded-lg w-full hover:bg-blue-700 transition duration-200"
              >
                {isEditMode ? 'Update Banner' : 'Create Banner'}
              </button>
            </div>
          </div>

          {/* Right Section - Banner List */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 w-full md:w-2/3 max-h-[600px] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Banners</h2>
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="border px-6 py-3 text-left text-sm font-semibold">Image</th>
                  <th className="border px-6 py-3 text-left text-sm font-semibold">Active</th>
                  <th className="border px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner._id} className="hover:bg-gray-50">
                    <td className="border px-6 py-3">{banner.name}</td>
                    <td className="border px-6 py-3">
                      <img src={banner.image} alt={banner.name} className="w-60 h-20 object-cover rounded-lg" />
                    </td>
                    <td className="border px-6 py-3">{banner.isActive ? 'Yes' : 'No'}</td>
                    <td className="border px-6 py-3 space-x-2">
                      <button
                        onClick={() => handleEditBanner(banner)} // Pass banner data for editing
                        className="bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(banner._id)}
                        className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;