// hooks/useUpdateProduct.js
import { useState } from 'react';

const useUpdateProduct = (setProducts) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateProduct = async (id, updatedProduct) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`, { // Replace with your actual endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updated = await response.json();
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? updated : product))
      );
    } catch (error) {
      setUpdateError(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateProduct, isUpdating, updateError };
};

export default useUpdateProduct;