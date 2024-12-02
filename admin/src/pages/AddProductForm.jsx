import React, { useState } from "react";

const AddProductForm = ({ handleAddProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    inStock: true,
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      inStock: e.target.checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.image ||
      !product.category
    ) {
      setError("All fields are required.");
      return;
    }
    setError("");
    handleAddProduct(product); // Pass product data to parent for processing
    setProduct({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      inStock: true,
    }); // Reset form after submission
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Add New Product
      </h1>
      {error && (
        <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
      >
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product description"
            rows="4"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product price"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter image URL"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-2"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product category"
          />
        </div>
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="inStock"
            checked={product.inStock}
            onChange={handleCheckboxChange}
            className="mr-2 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
          />
          <label htmlFor="inStock" className="text-gray-700 font-medium">
            In Stock
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-lg w-full hover:bg-blue-600 transition duration-200 font-semibold"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;