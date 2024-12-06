import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const BannerList = ({ banners, onEdit, onDelete }) => (
  <div className="flex-1 flex flex-col gap-5 p-5 md:px-10 border h-min bg-white">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Banners</h2>
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b px-4 py-2 text-sm font-medium text-gray-600">
              Name
            </th>
            <th className="border-b px-4 py-2 text-sm font-medium text-gray-600">
              Image
            </th>
            <th className="border-b px-4 py-2 text-sm font-medium text-gray-600">
              Active
            </th>
            <th className="border-b px-4 py-2 text-sm font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner._id} className="hover:bg-gray-50">
              <td className="border-b px-4 py-2 text-sm text-gray-800 text-center">
                {banner.name}
              </td>
              <td className="border-b px-4 py-2">
                <img
                  src={banner.image}
                  alt={banner.name}
                  className="w-full max-w-[150px]  h-auto object-cover rounded-sm shadow-sm"
                />
              </td>
              <td className="border-b px-4 py-2 text-sm text-gray-800">
                {banner.isActive ? "Yes" : "No"}
              </td>
              <td className="border-b px-4 py-3">
                <div className="flex items-center justify-around gap-2">
                  <button
                    onClick={() => onEdit(banner)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-1"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(banner._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default BannerList;
