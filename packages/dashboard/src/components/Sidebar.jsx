import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <header className="flex justify-between items-center px-4 py-6">
        <span className="text-xl font-semibold">Admin Dashboard</span>
      </header>
      <nav>
        <NavLink
          to="/"
          activeClassName="bg-gray-900"
          className="block py-2.5 px-4 rounded transition duration-200"
        >
          Home
        </NavLink>
        <NavLink
          to="/categories"
          activeClassName="bg-gray-900"
          className="block py-2.5 px-4 rounded transition duration-200"
        >
          Categories
        </NavLink>
        <NavLink
          to="/listings"
          activeClassName="bg-gray-900"
          className="block py-2.5 px-4 rounded transition duration-200"
        >
          Listings
        </NavLink>
        {/* Repeat for other links */}
      </nav>
    </div>
  );
};

export default Sidebar;
