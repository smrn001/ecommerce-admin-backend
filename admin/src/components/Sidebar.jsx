import React from "react";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  // List of pages in the sidebar
  const sidebarItems = [
    { name: "Dashboard", link: "/" },
    { name: "Banner", link: "/banners" },
    { name: "Products", link: "/products" },
    { name: "Users", link: "/users" },
    { name: "Categories", link: "/categories" },
    { name: "Brands", link: "/brands" },
    { name: "Admins", link: "/admins" },
  ];

  const location = useLocation(); // Get the current route

  return (
    <div className="h-screen bg-[#162C5D] text-white w-64 p-6">
      <ul>
        {sidebarItems.map((item, index) => (
          <li key={index} className="mb-4">
            <a
              href={item.link}
              className={`block py-2 px-4 rounded-md transition duration-300 ${
                location.pathname === item.link
                  ? "bg-blue-600 text-white" // Active link style
                  : "hover:bg-blue-600 hover:text-white" // Hover style
              }`}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;