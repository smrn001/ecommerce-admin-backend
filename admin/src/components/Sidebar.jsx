import React from "react";

const Sidebar = () => {
  // List of pages in the sidebar
  const sidebarItems = [
    { name: "Dashboard", link: "/" },
    {name:"Banner",link:"/banners"},
    { name: "Products", link: "/products" },
    { name: "Users", link: "/users" },
    { name: "Categories", link: "/categories" },
    { name: "Brands", link: "/brands" },
    { name: "Admins", link: "/admins" },
    // Add more items as necessary
  ];

  return (
    <div className="h-screen bg-gray-800 text-white w-64 p-6">
      <ul>
        {sidebarItems.map((item, index) => (
          <li key={index} className="mb-4">
            <a
              href={item.link}
              className="block py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
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