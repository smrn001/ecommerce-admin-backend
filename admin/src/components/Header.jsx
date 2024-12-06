import React, { useState } from "react";
import { Menu, CircleUserRound } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  const name = localStorage.getItem("name") || "Admin";
  const email = localStorage.getItem("email") || "admin@example.com";
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  return (
    <nav className="bg-gray-800 fixed w-full md:max-w-[80vw]  top-0 flex items-center p-4  shadow-lg gap-3 z-10 justify-between md:px-24">
      {/* Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        className="md:hidden"
      >
        <Menu size={28} className="text-gray-300 hover:text-white transition" />
      </button>
      <div className="hidden md:block"></div>

      {/* Brand */}
      <div className="text-gray-200 font-semibold text-2xl tracking-wide">
        Admin Panel
      </div>

      {/* User Profile */}
      <div className="relative flex items-center gap-4">
        {/* Circle Icon with Dropdown */}
        <button
          className="relative flex items-center gap-2 focus:outline-none hover:bg-gray-800 p-2 rounded-full transition"
          aria-haspopup="true"
          aria-expanded={dropdownVisible}
          aria-label="User Profile"
          onClick={toggleDropdown}
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <CircleUserRound
            size={28}
            className="text-gray-300 hover:text-white transition"
          />

          {/* Dropdown Content */}
          <div
            className={`absolute right-0 mt-10 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg transition-all duration-200 transform ${
              dropdownVisible
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <div className="p-5">
              <p className="font-semibold text-white">{name}</p>
              <p className="text-sm text-gray-400">{email}</p>
           
            </div>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Header;