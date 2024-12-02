import { useState, useEffect } from "react";
import toast from "react-hot-toast"; // Import react-hot-toast

const useBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newBanner, setNewBanner] = useState({
    name: "",
    image: "", // Keep the URL or path of the image
    link: "",
    isActive: false,
  });
  const [imageFile, setImageFile] = useState(null); // Separate state for the image file

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/banners`
        );
        if (!response.ok) throw new Error("Error fetching banners.");
        const data = await response.json();
        setBanners(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const handleCreateBanner = async (formData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/banners`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setBanners((prevBanners) => [...prevBanners, data]); // Add new banner to the list
        setNewBanner({ name: '', image: '', link: '', isActive: false }); // Reset form
        setImageFile(null); // Clear the image file input
        toast.success('Banner created successfully!'); // Success toast
      } else {
        console.error('Failed to create banner', data);
        setError(data.message || "Failed to create banner");
        toast.error('Failed to create banner'); // Error toast
      }
    } catch (error) {
      console.error('Error creating banner:', error);
      setError('Error creating banner');
      toast.error('Error creating banner'); // Error toast
    }
  };

  const handleUpdateBanner = async (id) => {
    try {
      const updatedBannerData = { ...newBanner };
      const formData = new FormData(); // Use FormData for the update to handle files
      formData.append("name", updatedBannerData.name);
      formData.append("link", updatedBannerData.link);
      formData.append("isActive", updatedBannerData.isActive);
      if (imageFile) {
        formData.append("image", imageFile); // Append the image if it's updated
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/banners/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Error updating banner.");
      const updatedBanner = await response.json();
      setBanners((prev) =>
        prev.map((banner) => (banner._id === id ? updatedBanner : banner))
      );
      setNewBanner({ name: '', image: '', link: '', isActive: false }); // Reset form
      setImageFile(null); // Reset image file
      toast.success('Banner updated successfully!'); // Success toast
    } catch (err) {
      setError(err.message);
      toast.error('Error updating banner'); // Error toast
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/banners/${id}`,
        { method: "DELETE" }
      );
      console.log("Response:", response); // Log response
      if (!response.ok) throw new Error("Error deleting banner");
      setBanners(banners.filter((banner) => banner._id !== id)); // Remove banner from the list
      toast.success('Banner deleted successfully!'); // Success toast
    } catch (err) {
      console.error("Delete Error:", err); // Log the error
      setError('Error deleting banner');
      toast.error('Error deleting banner'); // Error toast
    }
  };

  return {
    banners,
    loading,
    error,
    newBanner,
    setNewBanner,
    imageFile,
    setImageFile, // Expose setImageFile for handling file input
    handleCreateBanner,
    handleUpdateBanner,
    handleDeleteBanner,
  };
};

export default useBanners;