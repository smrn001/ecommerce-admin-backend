// hooks/useDeleteProduct.js
import { useState } from 'react';

const useDeleteProduct = (setProducts) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteProduct = async (id) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`, { // Replace with your actual endpoint
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      setDeleteError(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteProduct, isDeleting, deleteError };
};

export default useDeleteProduct;