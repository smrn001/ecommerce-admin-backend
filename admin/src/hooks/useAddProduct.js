// hooks/useAddProduct.js
import { useState } from 'react';

const useAddProduct = (setProducts) => {
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState(null);

  const addProduct = async (newProduct) => {
    setIsAdding(true);
    setAddError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`, { // Replace with your actual endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const addedProduct = await response.json();
      setProducts((prev) => [...prev, addedProduct]);
    } catch (error) {
      setAddError(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  return { addProduct, isAdding, addError };
};

export default useAddProduct;