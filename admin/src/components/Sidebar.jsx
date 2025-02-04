import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Home,
  Image,
  ShoppingCart,
  Users,
  List,
  Tag,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const sidebarItems = [
    { name: "Dashboard", link: "/", icon: <Home size={18} /> },
    { name: "Banner", link: "/banners", icon: <Image size={18} /> },
    { name: "Products", link: "/products", icon: <ShoppingCart size={18} /> },
    { name: "Users", link: "/users", icon: <Users size={18} /> },
    { name: "Categories", link: "/categories", icon: <List size={18} /> },
    { name: "Brands", link: "/brands", icon: <Tag size={18} /> },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutPopup(false);
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white h-screen w-[260px] flex flex-col z-40 lg:w-[20vw] lg:flex lg:flex-col">
      {/* Header */}
      <Link
        to="/"
        className="text-xl font-bold p-4 h-20 border-b text-center border-gray-600 text-white tracking-wide"
      >
        Logo
      </Link>

      {/* Sidebar Items */}
      <ul className="flex-1 overflow-y-auto mt-4">
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.link}
              className={`flex items-center gap-4 py-3 px-4 text-sm font-medium transition duration-200 ${
                location.pathname === item.link
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-600">
        <button
          onClick={() => setShowLogoutPopup(true)}
          className="flex items-center gap-3 text-sm font-medium text-white hover:text-red-500 transition duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center w-[300px]">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Logout
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 bg-gray-900 rounded-md hover:bg-gray-800 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;