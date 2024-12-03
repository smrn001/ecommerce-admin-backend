import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: "",
    colour: "",
    icon: "",
  });
  const [imageFile, setImageFile] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/categories`
        );
        if (!response.ok) throw new Error("Error fetching categories.");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle category creation
  const handleCreateCategory = async () => {
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("colour", newCategory.colour);
      formData.append("icon", newCategory.icon);
      if (imageFile) formData.append("image", imageFile);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/categories`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) throw new Error("Failed to create category.");
      const data = await response.json();
      setCategories((prev) => [...prev, data]);
      setNewCategory({ name: "", image: "", colour: "", icon: "" });
      setImageFile(null);
      toast.success("Category created successfully!");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  // Handle category update
  const handleUpdateCategory = async (id) => {
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("colour", newCategory.colour);
      formData.append("icon", newCategory.icon);
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
        prev.map((cat) => (cat._id === id ? updatedCategory : cat))
      );
      setNewCategory({ name: "", image: "", colour: "", icon: "" });
      setImageFile(null);
      toast.success("Category updated successfully!");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  // Handle category deletion
  const handleDeleteCategory = async (id) => {
    setError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/categories/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error deleting category.");
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      toast.success("Category deleted successfully!");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
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