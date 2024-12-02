import { useState, useEffect } from "react";

const useBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newBanner, setNewBanner] = useState({
    name: "",
    image: "",
    link: "",
    isActive: false,
  });

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

  const handleCreateBanner = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/banners`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBanner),
        }
      );

      if (!response.ok) throw new Error("Error creating banner.");
      const createdBanner = await response.json();
      setBanners((prev) => [...prev, createdBanner]);
      setNewBanner({ name: "", image: "", link: "", isActive: false });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateBanner = async (id) => {
    try {
      const updatedBannerData = { ...newBanner };
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/banners/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBannerData),
        }
      );

      if (!response.ok) throw new Error("Error updating banner.");
      const updatedBanner = await response.json();
      setBanners((prev) =>
        prev.map((banner) => (banner._id === id ? updatedBanner : banner))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/banners/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Error deleting banner.");
      setBanners((prev) => prev.filter((banner) => banner._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    banners,
    loading,
    error,
    newBanner,
    setNewBanner,
    handleCreateBanner,
    handleUpdateBanner,
    handleDeleteBanner,
  };
};

export default useBanners;
