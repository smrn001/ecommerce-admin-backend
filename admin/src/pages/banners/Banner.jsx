import React, { useState } from "react";
import useBanners from "../../hooks/useBanners";
import toast, { Toaster } from "react-hot-toast";
import BannerForm from "./BannerForm";
import BannerList from "./BannerList";

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

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditBanner = (banner) => {
    setNewBanner({
      _id: banner._id,
      name: banner.name,
      link: banner.link,
      isActive: banner.isActive,
    });
    setImageFile(null);
    setIsEditMode(true);
    setImagePreview(banner.image);
  };

  const confirmDeleteBanner = (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      handleDeleteBanner(id);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Toaster />
      <h1 className="text-4xl font-semibold text-center mb-8 text-black">
        Banner Management
      </h1>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <BannerForm
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            newBanner={newBanner}
            setNewBanner={setNewBanner}
            imageFile={imageFile}
            setImageFile={setImageFile}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            handleCreateBanner={handleCreateBanner}
            handleUpdateBanner={handleUpdateBanner}
          />
          <BannerList
            banners={banners}
            onEdit={handleEditBanner}
            onDelete={confirmDeleteBanner}
          />
        </div>
      )}
    </div>
  );
};

export default Banner;
