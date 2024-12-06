import { useState, useEffect } from "react";
import toast from "react-hot-toast"; // Import react-hot-toast for notifications

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });


  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`);
        if (!response.ok) throw new Error("Error fetching users.");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

// get a single user by ID
  const getUserById = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`);
      if (!response.ok) throw new Error("Error fetching user.");
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
    }
  };


  // Create a new user
  const handleCreateUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      if (response.ok) {
        setUsers((prevUsers) => [...prevUsers, data]); // Add new user to the list
        setNewUser({ name: "", email: "", password: "", isAdmin: false }); // Reset form
        toast.success("User created successfully!"); // Success toast
      } else {
        throw new Error(data.message || "Failed to create user");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Error creating user"); // Error toast
    }
  };

  // Update an existing user
  const handleUpdateUser = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error("Error updating user.");
      const updatedUser = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? updatedUser : user))
      );
      setNewUser({ name: "", email: "", password: "", isAdmin: false }); // Reset form
      toast.success("User updated successfully!"); // Success toast
    } catch (err) {
      setError(err.message);
      toast.error("Error updating user"); // Error toast
    }
  };


  // Delete a user
  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error deleting user.");
      setUsers((prev) => prev.filter((user) => user._id !== id)); // Remove user from the list
      toast.success("User deleted successfully!"); // Success toast
    } catch (err) {
      setError(err.message);
      toast.error("Error deleting user"); // Error toast
    }
  };

  return {
    users,
    loading,
    error,
    newUser,
    setNewUser,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    getUserById,
  };
};

export default useUsers;