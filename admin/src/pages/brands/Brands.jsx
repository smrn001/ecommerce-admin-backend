import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import useBrands from "../../hooks/useBrands"
import BrandForm from "./BrandForm";
import BrandList from "./BrandList";

const Brands = () => {
  const {
    brands,
    loading,
    error,
    newBrand,
    setNewBrand,
    handleCreateBrand,
    handleUpdateBrand,
    handleDeleteBrand,
  } = useBrands(); // Correct hook invocation

  const [imagePreview, setImagePreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);


  const handleEditBrand = (brands) => {
    setNewBrand({
      // Fixed to use setNewCategory
      _id: brands._id,
      name: brands.name,
      description: brands.description,
    });
    setImageFile(null);
    setIsEditMode(true);
    setImagePreview(brands.image);
  };

  const confirmDeleteBrand = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      handleDeleteBrand(id);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Toaster />
      <h1 className="text-4xl font-semibold text-center mb-8 text-black">
        Brand Management {/* Updated heading */}
      </h1>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <BrandForm
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            newBrand={newBrand}
            setNewBrand={setNewBrand}
            imageFile={imageFile}
            setImageFile={setImageFile}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            handleCreateBrand={handleCreateBrand}
            handleUpdateBrand={handleUpdateBrand}
          />
          <BrandList
            brands={brands}
            onEdit={handleEditBrand}
            onDelete={confirmDeleteBrand}
          />
        </div>
      )}
    </div>
  );
};

export default Brands;
