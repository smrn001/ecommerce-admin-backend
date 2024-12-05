import React, { useState } from "react";
import axios from "axios";

const ProductUploadForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    richDescription: "",
    brand: "",
    price: "",
    category: "",
    countInStock: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProductData({
      ...productData,
      images: e.target.files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all product data to the form data
    for (const [key, value] of Object.entries(productData)) {
      if (key === "images") {
        for (let i = 0; i < value.length; i++) {
          formData.append("images", value[i]);
        }
      } else {
        formData.append(key, value);
      }
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product uploaded successfully!");
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Error uploading product!");
    }
  };

  return (
    <div>
      <h1>Upload New Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Product Description:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rich Description:</label>
          <textarea
            name="richDescription"
            value={productData.richDescription}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label>Category ID:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Count in Stock:</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label>Product Images:</label>
          <input
            type="file"
            name="images"
            onChange={handleFileChange}
            multiple
            required
          />
        </div>
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
};

export default ProductUploadForm;