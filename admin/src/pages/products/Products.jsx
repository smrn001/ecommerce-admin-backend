import React, { useState } from "react";
import useProducts from "../../hooks/useProducts";
import toast, { Toaster } from "react-hot-toast";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import useBrandsAndCategories from "../../hooks/useBrandsAndCategories";

const Product = () => {
  const {
    products,
    loading: productsLoading,
    error: productsError,
    newProduct,
    setNewProduct,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  } = useProducts();

  const { brands, categories, loading: brandsAndCategoriesLoading, error: brandsAndCategoriesError } = useBrandsAndCategories();

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditProduct = (product) => {
    setNewProduct({
      _id: product._id,
      name: product.name,
      description: product.description,
      richDescription: product.richDescription,
      brand: product.brand,
      price: product.price,
      category: product.category,
      countInStock: product.countInStock,
      images: product.images,
    });
    setImageFiles([]);
    setIsEditMode(true);
    setImagePreviews(product.images);
  };

  const confirmDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      handleDeleteProduct(id);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-xl">
      <Toaster />
      <h1 className="text-4xl font-semibold text-center mb-8 text-black">
        Product Management
      </h1>
      {productsLoading || brandsAndCategoriesLoading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : productsError || brandsAndCategoriesError ? (
        <p className="text-center text-red-500">
          {productsError || brandsAndCategoriesError}
        </p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <ProductForm
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
            handleCreateProduct={handleCreateProduct}
            handleUpdateProduct={handleUpdateProduct}
            brands={brands}
            categories={categories}
          />
          <ProductList
            products={products}
            onEdit={handleEditProduct}
            onDelete={confirmDeleteProduct}
          />
        </div>
      )}
    </div>
  );
};

export default Product;