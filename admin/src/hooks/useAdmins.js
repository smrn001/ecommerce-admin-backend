import { useState, useEffect } from "react";
import toast from "react-hot-toast"; // Import react-hot-toast

const useAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    image: "", // Keep the URL or path of the image
    email: "",
  });
  const [imageFile, setImageFile] = useState(null); // Separate state for the image file

  // Fetch all admins
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/admins`
        );
        if (!response.ok) throw new Error("Error fetching admins.");
        const data = await response.json();
        setAdmins(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  // Create a new admin
  const handleCreateAdmin = async (formData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admins`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAdmins((prevAdmins) => [...prevAdmins, data]); // Add new admin to the list
        setNewAdmin({ name: "", image: "", email: "" }); // Reset form
        setImageFile(null); // Clear the image file input
        toast.success("Admin created successfully!"); // Success toast
      } else {
        console.error("Failed to create Admin", data);
        setError(data.message || "Failed to create admin");
        toast.error("Failed to create admin"); // Error toast
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      setError("Error creating admin");
      toast.error("Error creating admin"); // Error toast
    }
  };

  const handleUpdateAdmin = async (id) => {
    try {
      const updatedAdminData = { ...newAdmin }; // Copy the newAdmin object
      const formData = new FormData(); // Use FormData for the update to handle files
      formData.append("name", updatedAdminData.name);
      formData.append("email", updatedAdminData.email);
      if (imageFile) {
        formData.append("image", imageFile); // Append the image if it's updated
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admins/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Error updating admins.");
      const updatedAdmin = await response.json();
      setAdmins((prev) =>
        prev.map((admin) => (admin._id === id ? updatedAdmin : admin))
      );
      setNewAdmin({ name: "", image: "", email: "" }); // Reset form
      setImageFile(null); // Reset image file
      toast.success("Admin updated successfully!"); // Success toast
    } catch (err) {
      setError(err.message);
      toast.error("Error updating admin"); // Error toast
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admins/${id}`,
        { method: "DELETE" }
      );
      console.log("Response:", response); // Log response
      if (!response.ok) throw new Error("Error deleting admin");
      setAdmins(admins.filter((admin) => admin._id !== id)); // Remove admin from the list
      toast.success("admin deleted successfully!"); // Success toast
    } catch (err) {
      console.error("Delete Error:", err); // Log the error
      setError("Error deleting admin");
      toast.error("Error deleting admin"); // Error toast
    }
  };

  return {
    admins,
    loading,
    error,
    newAdmin,
    setNewAdmin,
    imageFile,
    setImageFile,
    handleCreateAdmin,
    handleUpdateAdmin,
    handleDeleteAdmin,
  };
};

export default useAdmins;
