import React from "react";
import { Edit3, Trash } from "lucide-react";

const BannerList = ({ banners, onEdit, onDelete }) => (
  <div className="bg-white p-8 border w-full md:w-2/3 max-h-[600px] overflow-y-auto">
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Banners</h2>
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-6 py-3 text-left text-sm font-semibold">
            Name
          </th>
          <th className="border px-6 py-3 text-left text-sm font-semibold">
            Image
          </th>
          <th className="border px-6 py-3 text-left text-sm font-semibold">
            Active
          </th>
          <th className="border px-6 py-3 text-left text-sm font-semibold">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {banners.map((banner) => (
          <tr key={banner._id} className="hover:bg-gray-50">
            <td className="border px-6 py-3">{banner.name}</td>
            <td className="border px-6 py-3">
              <img
                src={banner.image}
                alt={banner.name}
                className="w-60 h-20 object-cover rounded-sm"
              />
            </td>
            <td className="border px-6 py-3">
              {banner.isActive ? "Yes" : "No"}
            </td>
            <td className="border justify-between px-6 py-3 space-x-2 flex items-center">
              <button
                onClick={() => onEdit(banner)}
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200 flex items-center gap-2"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => onDelete(banner._id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200 flex items-center gap-2"
              >
                <Trash size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BannerList;