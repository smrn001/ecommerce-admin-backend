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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    const closeSidebar = handleClickOutside(sidebarRef, () =>
      setIsSidebarOpen(false)
    );
    document.addEventListener("mousedown", closeSidebar);

    return () => document.removeEventListener("mousedown", closeSidebar);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="relative flex mx-auto">
      <Toaster />

      {/* Sidebar */}
      {!isAuthRoute && (
        <>
          {/* Desktop Sidebar */}
          <aside className="hidden md:block fixed top-0 left-0 h-full w-[20vw] z-40">
            <Sidebar />
          </aside>

          {/* Mobile Sidebar */}
          <aside
            ref={sidebarRef}
            className={`fixed md:hidden top-0 left-0 h-full w-[260px] z-50 bg-gray-900 transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar />
          </aside>
        </>
      )}

      {/* Main Content */}
      <main
        className={`flex flex-1 flex-col overflow-hidden ${
          !isAuthRoute ? "md:ml-[20vw] md:w-[80vw]" : ""
        }`}
      >
        {!isAuthRoute && <Header toggleSidebar={toggleSidebar} />}

        <section className={`${!isAuthRoute ? "pt-20" : ""} flex-1`}>
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
        </section>
      </main>
    </div>
  );
};

export default App;
