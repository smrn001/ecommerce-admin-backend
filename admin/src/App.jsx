import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { validateToken } from "./utils/auth";
import { handleClickOutside } from "./utils/sidebar";

// Components & Pages
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import Admin from "./pages/admins/Admin";
import Banner from "./pages/banners/Banner";
import Products from "./pages/products/Products";
import Categories from "./pages/categories/Categories";
import Users from "./pages/users/Users";
import Brands from "./pages/brands/Brands";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthRoute = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = token && validateToken(token);

    setIsAuthenticated(Boolean(token));
    setIsAdmin(isAdmin);

    if (!isAuthRoute && !isAdmin) navigate("/login");
  }, [location.pathname]);

  useEffect(() => {
    const closeSidebar = handleClickOutside(sidebarRef, () => setIsOpen(false));
    document.addEventListener("mousedown", closeSidebar);

    return () => document.removeEventListener("mousedown", closeSidebar);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative flex max-w-[1500px] mx-auto">
      <Toaster />

      {/* Sidebar */}
      {!isAuthRoute && (
        <>
          {/* Desktop Sidebar */}
          <div className="hidden md:block fixed top-0 left-0 h-full w-[260px] bg-[#162C5D] z-40">
            <Sidebar />
          </div>

          {/* Mobile Sidebar */}
          <div
            ref={sidebarRef}
            className={`fixed md:hidden top-0 left-0 h-full w-[260px] bg-[#162C5D] z-50 transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar />
          </div>
        </>
      )}

      {/* Main Content */}
      <div
        className={`flex flex-1 flex-col ${
          !isAuthRoute ? "md:ml-[260px]" : ""
        } overflow-hidden`}
      >
        {/* Header */}
        {!isAuthRoute && <Header toggleSidebar={toggleSidebar} />}

        {/* Routes */}
        <div className={`${!isAuthRoute ? "pt-14" : ""} flex-1`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            {/* Protected Routes */}
            {isAuthenticated && isAdmin && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/admins" element={<Admin />} />
                <Route path="/banners" element={<Banner />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/users" element={<Users />} />
                <Route path="/brands" element={<Brands />} />
              </>
            )}

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
