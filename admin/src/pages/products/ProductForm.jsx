import React from "react";
import toast from "react-hot-toast";

const ProductForm = ({
  isEditMode,
  setIsEditMode,
  newProduct,
  setNewProduct,
  imageFiles,
  setImageFiles,
  imagePreviews,
  setImagePreviews,
  handleCreateProduct,
  handleUpdateProduct,
  brands,  // List of available brands
  categories,  // List of available categories
}) => {
  const handleFileChange = (e) => {
    const files = e.target.files;
    setImageFiles(files);
    const previews = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews(previews);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("richDescription", newProduct.richDescription);
    formData.append("brand", newProduct.brand);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("countInStock", newProduct.countInStock);
    Array.from(imageFiles).forEach((file) => {
      formData.append("images", file);
    });

    if (isEditMode) {
      await handleUpdateProduct(newProduct._id, formData);
      toast.success("Product updated successfully!");
      setIsEditMode(false);
    } else {
      await handleCreateProduct(formData);
    }

    setImageFiles([]);
    setImagePreviews([]);
  };

  return (
    <div className="bg-white p-6 border w-full md:w-1/3 h-min flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {isEditMode ? "Edit Product" : "Create a New Product"}
      </h2>
      <div className="space-y-4 flex flex-col items-left justify-between">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="p-4 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="p-4 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Rich Description"
          value={newProduct.richDescription}
          onChange={(e) => setNewProduct({ ...newProduct, richDescription: e.target.value })}
          className="p-4 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
        />
        
        {/* Dropdown for Brands */}
        <select
          value={newProduct.brand}
          onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
          className="p-4 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="p-4 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
        />

        {/* Dropdown for Categories */}
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="p-4 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Stock Count"
          value={newProduct.countInStock}
          onChange={(e) => setNewProduct({ ...newProduct, countInStock: e.target.value })}
          className="p-4 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="p-4 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
          multiple
        />
        {imagePreviews.length > 0 && (
          <div className="mt-4 flex justify-center space-x-4">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white p-4 hover:bg-blue-700 transition duration-200"
        >
          {isEditMode ? "Update Product" : "Create Product"}
        </button>
      </div>
    </div>
  );
};

export default ProductForm;