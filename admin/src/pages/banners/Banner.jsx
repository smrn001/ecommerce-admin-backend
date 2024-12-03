import React, { useState } from "react";
import useCategories from "../../hooks/useCategories"; // Hook for category operations
import toast, { Toaster } from "react-hot-toast";
import CategoryForm from "../categories/CategoryForm";
import CategoryList from "../categories/CategoryList";


const Category = () => {
  const {
    categories,
    loading,
    error,
    newCategory,
    setNewCategory,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  } = useCategories();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditCategory = (category) => {
    setNewCategory({
      _id: category._id,
      name: category.name,
      link: category.link,
      isActive: category.isActive,
    });
    setImageFile(null);
    setIsEditMode(true);
    setImagePreview(category.image);
  };

  const confirmDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      handleDeleteCategory(id);
      toast.error("Category deleted!");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-xl">
      <Toaster />
      <h1 className="text-4xl font-semibold text-center mb-8 text-black">
        Category Management
      </h1>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <CategoryForm
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            imageFile={imageFile}
            setImageFile={setImageFile}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            handleCreateCategory={handleCreateCategory}
            handleUpdateCategory={handleUpdateCategory}
          />
          <CategoryList
            categories={categories}
            onEdit={handleEditCategory}
            onDelete={confirmDeleteCategory}
          />
        </div>
      )}
    </div>
  );
};

export default Category;