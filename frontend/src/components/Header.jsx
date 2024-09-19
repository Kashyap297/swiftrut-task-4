// src/components/Header.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logging out
  };

  return (
    <header className="bg-white shadow py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-orange-500 flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faUserCircle} className="text-3xl" />
          <span>EventManager</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-4 relative">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center bg-transparent text-gray-600 hover:text-orange-500 border border-gray-300 px-4 py-2 rounded-md font-semibold"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600"
              >
                <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
