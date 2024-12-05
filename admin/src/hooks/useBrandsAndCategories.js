import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useBrandsAndCategories = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsResponse, categoriesResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/brands`),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/categories`)
        ]);

        if (!brandsResponse.ok || !categoriesResponse.ok) {
          throw new Error("Error fetching brands or categories.");
        }

        const [brandsData, categoriesData] = await Promise.all([
          brandsResponse.json(),
          categoriesResponse.json()
        ]);

        setBrands(brandsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { brands, categories, loading, error };
};

export default useBrandsAndCategories;