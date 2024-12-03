import React from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom"; // Import both Routes and Route from react-router-dom
import Home from "./pages/Home";
import Products from "./pages/Products";
import Sidebar from "./components/Sidebar";
import NotFound from "./pages/NotFound";
import AddProductPage from "./pages/AddProductPage";
import { Toaster } from "react-hot-toast";
import Banner from "./pages/banners/Banner";
import Categories from "./pages/categories/Categories";

const App = () => {
  return (
    <div className="h-screen w-[100vw]  mx-auto">
      <Header />
      <Toaster />

      <div className="flex ">
        <Sidebar />
        <Routes>
          {" "}
          {/* Wrap all routes inside the Routes component */}
          <Route path="/" element={<Home />} />
          <Route path="/banners" element={<Banner />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
