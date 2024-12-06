import React from "react";

const UserForm = ({
  isEditMode,
  setIsEditMode,
  newUser,
  setNewUser,
  handleCreateUser,
  handleUpdateUser,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      handleUpdateUser(newUser._id);
    } else {
      handleCreateUser();
    }
    setIsEditMode(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white srounded-sm border h-min md:w-1/3 w-full max-w-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {isEditMode ? "Edit User" : "Add New User"}
      </h2>
      <input
        type="text"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        placeholder="Name"
        className="w-full p-2 mb-4 border rounded-sm"
        required
      />
      <input
        type="email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        placeholder="Email"
        className="w-full p-2 mb-4 border rounded-sm"
        required
      />
    <div className="mb-4">
        <label className="block mb-2 font-medium">Role:</label>
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="w-full p-2 border rounded-sm"
          required
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-sm hover:bg-blue-700"
      >
        {isEditMode ? "Update User" : "Create User"}
      </button>
    </form>
  );
};

export default UserForm;