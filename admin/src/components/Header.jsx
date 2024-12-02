import React from "react";

const Header = () => {
  return (
    <nav className="bg-[#162C5D] p-4 shadow-md flex items-center justify-center  w-full ">
      <div className="flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-white font-semibold text-xl">Admin Panel</div>
      </div>
    </nav>
  );
};

export default Header;
