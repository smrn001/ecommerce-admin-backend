import { useState, useEffect } from "react";
import toast from "react-hot-toast"; // Import react-hot-toast

const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newBrand, setNewBrand] = useState({
    name: "",
    image: "",
    description: "",
 
  });
  const [imageFile, setImageFile] = useState(null); // Separate state for the image file

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/brands`
        );
        if (!response.ok) throw new Error("Error fetching brands.");
        const data = await response.json();
        setBrands(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleCreateBrand = async (formData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/brands`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setBrands((prevBrands) => [...prevBrands, data]); // Add new brand to the list
        setNewBrand({ name: '', image: '', description: '' }); // Reset form
        setImageFile(null); // Clear the image file input
        toast.success('brand created successfully!'); // Success toast
      } else {
        console.error('Failed to create brand', data);
        setError(data.message || "Failed to create brand");
        toast.error('Failed to create brand'); // Error toast
      }
    } catch (error) {
      console.error('Error creating brand:', error);
      setError('Error creating brand');
      toast.error('Error creating brand'); // Error toast
    }
  };

  const handleUpdateBrand = async (id) => {
    try {
      const updatedBrandData = { ...newBrand };
      const formData = new FormData(); // Use FormData for the update to handle files
      formData.append("name", updatedBrandData.name);
      formData.append("description", updatedBrandData.description);
      if (imageFile) {
        formData.append("image", imageFile); // Append the image if it's updated
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/brands/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Error updating brands.");
      const updatedBrand = await response.json();
      setBrands((prev) =>
        prev.map((brand) => (brand._id === id ? updatedBrand : brand))
      );
      setNewBrand({ name: '', image: '', description: '' }); // Reset form
      setImageFile(null); // Reset image file
      toast.success('brand updated successfully!'); // Success toast
    } catch (err) {
      setError(err.message);
      toast.error('Error updating brand'); // Error toast
    }
  };

  const handleDeleteBrand = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/brands/${id}`,
        { method: "DELETE" }
      );
      console.log("Response:", response); // Log response
      if (!response.ok) throw new Error("Error deleting brand");
      setBrands(brands.filter((brand) => brand._id !== id)); // Remove brand from the list
      toast.success('brands deleted successfully!'); // Success toast
    } catch (err) {
      console.error("Delete Error:", err); // Log the error
      setError('Error deleting brands');
      toast.error('Error deleting brands'); // Error toast
    }
  };

  return {
    brands,
    loading,
    error,
    newBrand,
    setNewBrand,
    imageFile,
    setImageFile, 
    handleCreateBrand,
    handleUpdateBrand,
    handleDeleteBrand,


  };
};

export default useBrands;