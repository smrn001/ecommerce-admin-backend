import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const AdminList = ({ admins, onEdit, onDelete }) => (
  <div className="flex-1 flex flex-col gap-5 p-5 md:px-10 border h-min bg-white">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Admins</h2>
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
              Email
            </th>
            <th className="border-b px-4 py-2 text-sm font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id} className="hover:bg-gray-50">
              <td className="border-b px-4 py-2 text-sm text-gray-800 text-center">
                {admin.name}
              </td>
              <td className="border-b px-4 py-2 items-center flex justify-center">
                <img
                  src={admin.image}
                  alt={admin.name}
                  className="h-16 w-16  rounded-md  object-cover  shadow-sm"
                />
              </td>
              <td className="border-b px-4 py-2 text-sm text-gray-800 text-center">
                {admin.email }
              </td>
              <td className="border-b px-4 py-3 ">
                <div className="flex items-center justify-around gap-2">
                  <button
                    onClick={() => onEdit(admin)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-1"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(admin._id)}
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

export default AdminList;
