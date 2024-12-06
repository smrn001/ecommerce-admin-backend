import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const UserList = ({ users, onEdit, onDelete }) => (
  <div className="flex-1 flex flex-col gap-5 p-5 md:px-10 border h-min bg-white rounded-sm">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Users</h2>
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b px-4 py-2 text-sm font-medium text-gray-600">
              Name
            </th>
            <th className="border-b px-4 py-2 text-sm font-medium text-gray-600">
              Email
            </th>
            <th className="border-b px-4 py-2 text-sm font-medium text-gray-600">
              Role
            </th>
            <th className="border-b px-4 py-2 text-sm font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-gray-50 transition-all duration-200 ease-in-out"
            >
              <td className="border-b px-4 py-2 text-sm text-gray-800 text-center">
                {user.name}
              </td>
              <td className="border-b px-4 py-2 text-sm text-gray-800 text-center">
                {user.email}
              </td>
              <td className="border-b px-4 py-2 text-sm text-gray-800 text-center">
                {user.role}
              </td>
              <td className="border-b px-4 py-3">
                <div className="flex items-center gap-2 justify-center">
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2 transition-all duration-200 ease-in-out"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-2 transition-all duration-200 ease-in-out"
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

export default UserList;
