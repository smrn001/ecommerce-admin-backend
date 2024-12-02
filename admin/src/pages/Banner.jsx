import React from 'react';
import useBanners from '../hooks/useBanners';

const Banner = () => {
  const {
    banners,
    loading,
    error,
    newBanner,
    setNewBanner,
    handleCreateBanner,
    handleUpdateBanner,
    handleDeleteBanner,
  } = useBanners();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Admin - Banner Management</h1>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section - Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create a New Banner</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Banner Name"
                value={newBanner.name}
                onChange={(e) => setNewBanner({ ...newBanner, name: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newBanner.image}
                onChange={(e) => setNewBanner({ ...newBanner, image: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Link"
                value={newBanner.link}
                onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg mb-4 w-full focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={newBanner.isActive}
                  onChange={() => setNewBanner({ ...newBanner, isActive: !newBanner.isActive })}
                  className="mr-2"
                />
                <span>Active</span>
              </div>
              <button
                onClick={handleCreateBanner}
                className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 w-full"
              >
                Create Banner
              </button>
            </div>
          </div>

          {/* Right Section - Banner List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">All Banners</h2>
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Image</th>
                  <th className="border px-4 py-2 text-left">Link</th>
                  <th className="border px-4 py-2 text-left">Active</th>
                  <th className="border px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{banner.name}</td>
                    <td className="border px-4 py-2">
                      <img src={banner.image} alt={banner.name} className="w-20 h-20 object-cover" />
                    </td>
                    <td className="border px-4 py-2">{banner.link}</td>
                    <td className="border px-4 py-2">{banner.isActive ? 'Yes' : 'No'}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleUpdateBanner(banner._id)}
                        className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(banner._id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;