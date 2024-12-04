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
    formData.append("name", newCategory.name); // Corrected to newCategory

    if (imageFile) formData.append("image", imageFile);

    try {
      if (isEditMode) {
        await handleUpdateCategory(newCategory._id, formData); // Corrected to newCategory
        toast.success("Category updated successfully!"); // Success toast
        setIsEditMode(false);
      } else {
        await handleCreateCategory(formData);
        toast.success("Category created successfully!"); // Success toast
      }

      // Clear form after submission
      setNewCategory({ name: "", image: "" }); // Reset category form state
      setImageFile(null); // Reset image file
      setImagePreview(null); // Reset image preview
    } catch (error) {
      toast.error("Error while submitting the form!"); // Error toast
    }
  };

  return (
    <div className="bg-white p-6 border w-full md:w-1/3 h-min flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {isEditMode ? "Edit Category" : "Create a New Category"} {/* Updated title */}
      </h2>
      <div className="space-y-4 flex flex-col items-left justify-between">
        <input
          type="text"
          placeholder="Category Name" 
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
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

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white p-4 hover:bg-blue-700 transition duration-200"
        >
          {isEditMode ? "Update Category" : "Create Category"} {/* Updated button text */}
        </button>
      </div>
    </div>
  );
};

export default CategoryForm;