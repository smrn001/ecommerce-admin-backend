import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import Banner from "./pages/banners/Banner";
import Categories from "./pages/categories/Categories";
import Products from "./pages/products/Products";
import AddProductPage from "./pages/products/AddProductPage";
import Brands from "./pages/brands/Brands";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close the sidebar when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutsideEvent(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideEvent);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEvent);
    };
  }, []);

  return (
    <div className="relative flex max-w-[1500px] mx-auto">
      <Toaster />
      {/* Fixed Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 h-full w-[260px] bg-[#162C5D] z-40">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:hidden top-0 left-0 h-full w-[260px] bg-[#162C5D] z-50 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:ml-[260px] overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <div className="pt-14 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/banners" element={<Banner />} />
            <Route path="/products" element={<Products />} />
            <Route path="brands" element={<Brands/>}/>
            <Route path="/categories" element={<Categories />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;