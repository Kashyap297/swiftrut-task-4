import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          EventManager
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full px-4 py-2 rounded-md text-gray-700"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
