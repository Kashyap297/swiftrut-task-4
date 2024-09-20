import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle,
  faSignInAlt,
  faSignOutAlt,
  faCaretDown,
  faPlus,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Get user from AuthContext
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to homepage after logging out
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white shadow py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#dc363c] flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faUserCircle} className="text-3xl" />
          <span>BookMyEvents</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-4 relative">
          {/* <input
            type="text"
            placeholder="Search events..."
            className="px-4 py-2 ps-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          /> */}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 items-center relative">
          {user ? (
            <>
              <span className="text-gray-700 font-semibold">
                Welcome, {user.username}
              </span>

              {/* Dropdown Toggle Button */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="bg-[#093054] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#102144] flex items-center"
                >
                  Actions
                  <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <Link
                      to="/create-event"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-2" />
                      Create Event
                    </Link>
                    <Link
                      to="/my-events"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FontAwesomeIcon icon={faListAlt} className="mr-2" />
                      My Events
                    </Link>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center bg-[#dc363c] text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center bg-transparent text-gray-600 hover:text-red-600 border border-gray-300 px-4 py-2 rounded-md font-semibold"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center bg-[#dc363c] text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600"
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
