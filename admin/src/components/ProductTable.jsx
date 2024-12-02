// components/ProductTable.js
import React from "react";

const ProductTable = ({ products, editProduct, deleteProduct, isDeleting, deleteError }) => {
  return (
    <div>
      {deleteError && (
        <div className="text-center text-xl text-red-500 font-bold">{deleteError}</div>
      )}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Brand</th>
            <th className="px-4 py-2 text-left">Rating</th>
            <th className="px-4 py-2 text-left">Featured</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2">${product.price}</td>
              <td className="px-4 py-2">{product.countInStock}</td>
              <td className="px-4 py-2">{product.brand}</td>
              <td className="px-4 py-2">{product.rating}</td>
              <td className="px-4 py-2">{product.isFeatured ? "Yes" : "No"}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => editProduct(product._id)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => deleteProduct(product._id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;