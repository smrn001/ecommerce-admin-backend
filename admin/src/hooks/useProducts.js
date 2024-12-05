import { useState, useEffect } from "react";
import toast from "react-hot-toast"; // Import react-hot-toast

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    richDescription: "",
    brand: "",
    price: "",
    category: "",
    countInStock: "",
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]); // Separate state for the images (file list)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/products`
        );
        if (!response.ok) throw new Error("Error fetching products.");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = async (formData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setProducts((prevProducts) => [...prevProducts, data]); // Add new product to the list
        setNewProduct({
          name: "",
          description: "",
          richDescription: "",
          brand: "",
          price: "",
          category: "",
          countInStock: "",
          images: [],
        }); // Reset form
        setImageFiles([]); // Clear image files
        toast.success("Product created successfully!"); // Success toast
      } else {
        console.error("Failed to create product", data);
        setError(data.message || "Failed to create product");
        toast.error("Failed to create product"); // Error toast
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Error creating product");
      toast.error("Error creating product"); // Error toast
    }
  };

  const handleUpdateProduct = async (id) => {
    try {
      const updatedProductData = { ...newProduct };
      const formData = new FormData(); // Use FormData for the update to handle files
      formData.append("name", updatedProductData.name);
      formData.append("description", updatedProductData.description);
      formData.append("richDescription", updatedProductData.richDescription);
      formData.append("brand", updatedProductData.brand);
      formData.append("price", updatedProductData.price);
      formData.append("category", updatedProductData.category);
      formData.append("countInStock", updatedProductData.countInStock);
      updatedProductData.images.forEach((image) => {
        formData.append("images", image); // Append each image file
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Error updating product.");
      const updatedProduct = await response.json();
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? updatedProduct : product))
      );
      setNewProduct({
        name: "",
        description: "",
        richDescription: "",
        brand: "",
        price: "",
        category: "",
        countInStock: "",
        images: [],
      }); // Reset form
      setImageFiles([]); // Reset image files
      toast.success("Product updated successfully!"); // Success toast
    } catch (err) {
      setError(err.message);
      toast.error("Error updating product"); // Error toast
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error deleting product");
      setProducts(products.filter((product) => product._id !== id)); // Remove product from the list
      toast.success("Product deleted successfully!"); // Success toast
    } catch (err) {
      console.error("Delete Error:", err);
      setError("Error deleting product");
      toast.error("Error deleting product"); // Error toast
    }
  };

  return {
    products,
    loading,
    error,
    newProduct,
    setNewProduct,
    imageFiles,
    setImageFiles, // Expose setImageFiles for handling file input
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };
};

export default useProducts;
