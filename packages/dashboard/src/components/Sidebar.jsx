import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <header className="flex justify-between items-center px-4 py-6">
        <span className="text-xl font-semibold">Admin Dashboard</span>
      </header>
      <nav>
        <NavLink
          to="/"
          className={`block py-2.5 px-4 rounded transition duration-200 ${
            location.pathname === "/" ? "bg-gray-900" : ""
          }`}
        >
          Home
        </NavLink>
        <NavLink
          to="/advertisements"
          className={`block py-2.5 px-4 rounded transition duration-200 ${
            location.pathname === "/advertisements" ? "bg-gray-900" : ""
          }`}
        >
          Advertisements
        </NavLink>
        <NavLink
          to="/categories"
          className={`block py-2.5 px-4 rounded transition duration-200 ${
            location.pathname === "/categories" ? "bg-gray-900" : ""
          }`}
        >
          Categories
        </NavLink>
        <NavLink
          to="/listings"
          className={`block py-2.5 px-4 rounded transition duration-200 ${
            location.pathname === "/listings" ? "bg-gray-900" : ""
          }`}
        >
          Listings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
