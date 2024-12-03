import React from "react";
import { useLocation } from "react-router-dom";
import {
  Home,
  Image,
  ShoppingCart,
  Users,
  List,
  Tag,
  Shield,
} from "lucide-react";

const Sidebar = () => {
  // Sidebar items with icons
  const sidebarItems = [
    { name: "Dashboard", link: "/", icon: <Home size={18} /> },
    { name: "Banner", link: "/banners", icon: <Image size={18} /> },
    { name: "Products", link: "/products", icon: <ShoppingCart size={18} /> },
    { name: "Users", link: "/users", icon: <Users size={18} /> },
    { name: "Categories", link: "/categories", icon: <List size={18} /> },
    { name: "Brands", link: "/brands", icon: <Tag size={18} /> },
    { name: "Admins", link: "/admins", icon: <Shield size={18} /> },
  ];

  const location = useLocation(); // Get the current route

  return (
    <div className="h-screen bg-[#162C5D] text-white w-64 p-6 flex flex-col">
      <div className="text-2xl font-semibold mb-8">Admin Panel</div>
      <ul className="space-y-4">
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              className={`flex items-center gap-4 py-2 px-4 rounded-md text-sm font-medium transition duration-300 ${
                location.pathname === item.link
                  ? "bg-blue-600 text-white shadow"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
