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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Add New Product
      </h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-lg font-semibold mb-2"
          >
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product description"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-lg font-semibold mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product price"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-lg font-semibold mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image URL"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-lg font-semibold mb-2"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product category"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="inStock"
            checked={product.inStock}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="inStock" className="text-lg font-semibold">
            In Stock
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
