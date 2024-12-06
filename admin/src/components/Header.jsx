import React from "react";
import { Menu, CircleUserRound } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gray-800 fixed w-full max-w-[1240px] top-0 flex items-center p-4 shadow-md gap-3 z-10 justify-between md:px-24">
      <button
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        className="md:hidden"
      >
        <Menu size={24} className="text-white" />
      </button>
      <div className="flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-white font-semibold text-xl">Admin Panel</div>
      </div>
      <div className="flex items-center gap-4">
        {/* User Profile */}
        <div className="flex items-center gap-2">
          <CircleUserRound size={24} className="text-white" />
          <span className="text-white font-medium">Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Header;