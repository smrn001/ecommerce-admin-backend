import React from "react";
import toast from "react-hot-toast";

const BrandForm = ({
  isEditMode,
  setIsEditMode,
  newBrand,
  setNewBrand,
  imageFile,
  setImageFile,
  imagePreview,
  setImagePreview,
  handleCreateBrand,
  handleUpdateBrand,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", newBrand.name); // Corrected to newCategory
    formData.append("description", newBrand.description); // Added description field

    if (imageFile) formData.append("image", imageFile);

    try {
      if (isEditMode) {
        await handleUpdateBrand(newBrand._id, formData); // Corrected to newCategory
        setIsEditMode(false);
      } else {
        await handleCreateBrand(formData);
      }

      // Clear form after submission
      setNewBrand({ name: "", image: "", description: "" }); // Reset category form state
      setImageFile(null); // Reset image file
      setImagePreview(null); // Reset image preview
    } catch (error) {
      toast.error("Error while submitting the form!"); // Error toast
    }
  };

  return (
    <div className="bg-white p-6 border w-full md:w-1/3 h-min flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {isEditMode ? "Edit Brand" : "Create a New Brand"} {/* Updated title */}
      </h2>
      <div className="space-y-4 flex flex-col items-left justify-between">
        <input
          type="text"
          placeholder="Brand Name"
          value={newBrand.name}
          onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
          className="p-4 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Brand Description"
          value={newBrand.description}
          onChange={(e) =>
            setNewBrand({ ...newBrand, description: e.target.value })
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
              className="w-[80px] h-[80px] object-contain "
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white p-4 hover:bg-blue-700 transition duration-200"
        >
          {isEditMode ? "Update Brand" : "Create Brand"}{" "}
          {/* Updated button text */}
        </button>
      </div>
    </div>
  );
};

export default BrandForm;
