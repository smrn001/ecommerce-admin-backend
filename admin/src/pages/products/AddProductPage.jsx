import React, { useState } from "react";
import AddProductForm from "./AddProductForm";

const AddProductPage = () => {
  const [products, setProducts] = useState([]); // State to hold added products (optional)

  const handleAddProduct = (newProduct) => {
    // Mock API call or add product logic
    console.log("Adding new product:", newProduct);

    // Example: Adding the product to a local state
    setProducts((prevProducts) => [...prevProducts, newProduct]);

    // Real scenario: You might send the product to your backend here
    // Example:
    // await axios.post("/api/products", newProduct);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h1>
      <AddProductForm handleAddProduct={handleAddProduct} />
    </div>
  );
};

export default AddProductPage;