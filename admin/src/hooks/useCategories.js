import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: "", // Keep the URL or path of the image
  });
  const [imageFile, setImageFile] = useState(null); // Separate state for the image file

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/categories`
        );
        if (!response.ok) throw new Error("Error fetching categories.");
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle category creation
  const handleCreateCategory = async (formData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/categories`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCategories((prevCategories) => [...prevCategories, data]);
        setNewCategory({ name: "", image: "" });
        setImageFile(null);
        toast.success("Category created successfully!");
      } else {
        console.error("Failed to create category", data);
        setError(data.message || "Failed to create category");
        toast.error("Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      setError("Error creating category");
      toast.error("Error creating category");
    }
  };

  // Handle category update
  const handleUpdateCategory = async (id) => {
    try {
      const updatedCategoryData = { ...newCategory };
      const formData = new FormData();
      formData.append("name", updatedCategoryData.name);
      if (imageFile) formData.append("image", imageFile);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/categories/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Error updating category.");
      const updatedCategory = await response.json();
      setCategories((prev) =>
        prev.map((category) =>
          category._id === id ? updatedCategory : category
        )
      );
      setNewCategory((prev) => ({ ...prev, image: updatedCategory.image })); // Update image URL
      setImageFile(null); // Reset image file
      toast.success("Category updated successfully!");
    } catch (err) {
      setError(err.message);
      toast.error("Error updating category");
    }
  };

  // Handle category deletion
  const handleDeleteCategory = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/categories/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error deleting category");
      setCategories(categories.filter((category) => category._id !== id));
      toast.success("Category deleted successfully!");
    } catch (err) {
      console.error("Delete Error:", err);
      setError("Error deleting category");
      toast.error("Error deleting category");
    }
  };

  return {
    categories,
    loading,
    error,
    newCategory,
    setNewCategory,
    imageFile,
    setImageFile,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  };
};

export default useCategories;