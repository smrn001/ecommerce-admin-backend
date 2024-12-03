import React from "react";
import toast from "react-hot-toast";

const CategoryForm = ({
  isEditMode,
  setIsEditMode,
  newCategory,
  setNewCategory,
  imageFile,
  setImageFile,
  imagePreview,
  setImagePreview,
  handleCreateCategory,
  handleUpdateCategory,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("colour", newCategory.colour);
    formData.append("icon", newCategory.icon);
    if (imageFile) formData.append("image", imageFile);

    if (isEditMode) {
      await handleUpdateCategory(newCategory._id, formData);
      toast.success("Category updated successfully!");
      setIsEditMode(false);
    } else {
      await handleCreateCategory(formData);
      toast.success("Category created successfully!");
    }

    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="bg-white p-6 border w-full md:w-1/3">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {isEditMode ? "Edit Category" : "Create a New Category"}
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          className="p-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Category Colour"
          value={newCategory.colour}
          onChange={(e) =>
            setNewCategory({ ...newCategory, colour: e.target.value })
          }
          className="p-4 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Category Icon (URL)"
          value={newCategory.icon}
          onChange={(e) =>
            setNewCategory({ ...newCategory, icon: e.target.value })
          }
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
              className="w-60 h-20 object-cover rounded-sm"
            />
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white p-4 rounded-lg w-full hover:bg-blue-700 transition duration-200"
        >
          {isEditMode ? "Update Category" : "Create Category"}
        </button>
      </div>
    </div>
  );
};

export default CategoryForm;