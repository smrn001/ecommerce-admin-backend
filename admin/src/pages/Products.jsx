import React from 'react';
import useProducts from "../hooks/useProducts";
import useDeleteProduct from "../hooks/useDeleteProduct";
import useAddProduct from "../hooks/useAddProduct";
import useUpdateProduct from "../hooks/useUpdateProduct";
import ProductTable from "../components/ProductTable";
import AddProductForm from './AddProductForm';

const Products = () => {
  // Fetching products with useProducts hook
  const { products, loading, error, setProducts } = useProducts();

  // Deleting products with useDeleteProduct hook
  const { deleteProduct, isDeleting, deleteError } = useDeleteProduct(setProducts);

  // Handling product creation with useAddProduct hook
  const { addProduct, isAdding, addError } = useAddProduct(setProducts);

  // Handling product update with useUpdateProduct hook
  const { updateProduct, isUpdating, updateError } = useUpdateProduct(setProducts);

  // Function to handle editing products
  const editProduct = (id) => {
    console.log("Edit product with ID: ", id);
    // You can implement a way to open a modal or redirect to an edit page
  };

  // Handle add product form submission
  const handleAddProduct = (newProduct) => {
    addProduct(newProduct); // Use the hook's addProduct method to handle the submission
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Admin - Product List</h1>

      {/* Add Product Form */}
      <AddProductForm handleAddProduct={handleAddProduct} isAdding={isAdding} addError={addError} />

      {loading ? (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-xl text-red-500 font-bold">{error}</div>
      ) : (
        <ProductTable
          products={products}
          editProduct={editProduct}
          deleteProduct={deleteProduct}
          isDeleting={isDeleting}
          deleteError={deleteError}
          updateProduct={updateProduct}
          isUpdating={isUpdating}
          updateError={updateError}
        />
      )}
    </div>
  );
};

export default Products;