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
  const sidebarItems = [
    { name: "Dashboard", link: "/", icon: <Home size={18} /> },
    { name: "Banner", link: "/banners", icon: <Image size={18} /> },
    { name: "Products", link: "/products", icon: <ShoppingCart size={18} /> },
    { name: "Users", link: "/users", icon: <Users size={18} /> },
    { name: "Categories", link: "/categories", icon: <List size={18} /> },
    { name: "Brands", link: "/brands", icon: <Tag size={18} /> },
    { name: "Admins", link: "/admins", icon: <Shield size={18} /> },
  ];

  const location = useLocation();

  return (
    <div className="bg-[#1e1e1e] sticky top-0 text-white h-screen w-[260px] flex flex-col">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        Admin Panel
      </div>
      <ul className="flex-1 overflow-y-auto  mt-4 ">
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              className={`flex items-center gap-4 py-3 px-4 text-sm font-medium transition duration-200 ${
                location.pathname === item.link
                  ? "bg-[#3858E9] text-white shadow-lg"
                  : "hover:bg-[#3858E9] hover:text-white"
              }`}
            >
              <span className="text-white">{item.icon}</span>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="p-4 text-xs text-gray-400 border-t border-gray-700">
        © 2024 Admin Panel
      </div>
    </div>
  );
};

export default Sidebar;
