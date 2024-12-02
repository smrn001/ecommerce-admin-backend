import React from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom"; // Import both Routes and Route from react-router-dom
import Home from "./pages/Home";
import Products from "./pages/Products";
import Sidebar from "./components/Sidebar";
import NotFound from "./pages/NotFound";
import Banner from "./pages/Banner";

const App = () => {
  return (
    <div className="h-screen w-[100vw]  mx-auto">
      <Header />
      <div className="flex ">
        <Sidebar />
        <Routes>
          {" "}
          {/* Wrap all routes inside the Routes component */}
          <Route path="/" element={<Home />} />
          <Route path="/banners" element={<Banner />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
