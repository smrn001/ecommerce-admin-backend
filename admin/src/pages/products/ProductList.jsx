import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const ProductList = ({ products, onEdit, onDelete }) => (
  <div className="flex-1 flex flex-col gap-5 p-5 md:px-10 border h-min bg-white">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Products</h2>
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
              Price
            </th>
            <th className="border-b px-4 py-2 text-sm font-medium text-gray-600">
              In Stock
            </th>
            <th className="border-b px-4 py-2 text-sm font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="border-b px-4 py-2 text-sm text-gray-800">
                {product.name}
              </td>
              <td className="border-b px-4 py-2">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full max-w-[200px] h-auto object-cover rounded-sm shadow-sm"
                />
              </td>
              <td className="border-b px-4 py-2 text-sm text-gray-800">
                ${product.price}
              </td>
              <td className="border-b px-4 py-2 text-sm text-gray-800">
                {product.countInStock > 0 ? "Yes" : "No"}
              </td>
              <td className="border-b px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-1"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
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

export default ProductList;