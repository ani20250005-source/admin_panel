import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { FaUser, FaSignOutAlt } from "react-icons/fa";


export default function Header({ open, setOpen, activePage, setActivePage }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchValue);
    setSearchOpen(false); // close overlay after search
  };

  return (
    <>
      <nav
        className="bg-[#f6ffd9] px-4 py-3 flex justify-between items-center duration-500 fixed top-0 shadow-md z-40"
        style={{
          left: isMobile ? "0" : open ? "240px" : "64px",
          width: isMobile ? "100%" : `calc(100% - ${open ? 240 : 64}px)`,
        }}
      >
       {/* Left Section */}
      <div className="flex items-center gap-3 text-lg sm:text-xl">

        {/* Mobile Toggle Button (Left side) */}
        {isMobile && (
          <CiMenuFries
            size={26}
            className="text-[green] cursor-pointer duration-500"
            onClick={() => setOpen(!open)}
          />
        )}

        {/* Page Title */}
        <span className="text-black font-semibold text-lg sm:text-xl">
          {activePage}
        </span>
      </div>


        {/* Right Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Desktop Search */}
          {!isMobile && (
            <form onSubmit={handleSearch} className="relative w-40 lg:w-56">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="text-green-700" />
              </span>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-3 py-1 bg-white rounded-lg shadow outline-none focus:ring-1 focus:ring-green-700 text-sm"
              />
            </form>
          )}

          {/* Mobile Search Icon */}
          {isMobile && (
            <FaSearch
              className="text-[green] text-lg cursor-pointer md:hidden"
              onClick={() => setSearchOpen(true)}
            />
          )}

          {/* Notification Icon */}
          <FaBell
            className="w-5 h-5 sm:w-6 sm:h-6 text-[green] cursor-pointer"
            onClick={() => { setActivePage("Notifications"); navigate("/notifications")}}
          />
         
          {/*  Profile Icon with Dropdown */}
          <div className="relative" ref={profileRef}>
            <FaUserCircle
              className="w-7 h-7 sm:w-8 sm:h-8 text-[green] cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />

             {/* Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg border border-gray-200 py-2 z-50">
                
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    setActivePage("Profile");
                    navigate("/profile");
                  }}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-green-600 hover:text-white text-gray-700"
                >
                  <FaUser /> Profile
                </button>

                <button
                  onClick={() => {
                    // 1. Dropdown close
                    setProfileOpen(false);

                    // 2. Token / session remove
                    localStorage.removeItem("authToken");
                    sessionStorage.removeItem("authToken");

                    // 3. Active page reset
                    setActivePage("");

                    // 4. Redirect to login
                    navigate("/login", { replace: true });
                  }}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white text-red-600"
                >
                  <FaSignOutAlt /> Logout
                </button>
                
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {isMobile && searchOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col z-50">
          {/* Top bar with Back + Search Input */}
          <div className="flex items-center px-4 py-3 bg-[#f6ffd9] shadow-md gap-2">
            {/* Back Icon */}
            <FaArrowLeft
              className="text-green-700 text-xl cursor-pointer"
              onClick={() => setSearchOpen(false)}
            />

            {/* Search Input */}
            <div className="flex items-center flex-1 bg-white rounded-lg px-2 py-2">
              <FaSearch className="text-green-700 mr-2" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              {searchValue && (
                <FaTimes
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setSearchValue("")}
                />
              )}
            </div>
          </div>

          {/* Search Results Area */}
          <div className="p-4">
            {searchValue ? (
              <ul className="space-y-2">
                {/* Example static results — replace with your API/data */}
                {["Settings", "Reports", "Websites", "Users", "Apps"]
                  .filter((item) =>
                    item.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((result, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 bg-white rounded-md  cursor-pointer hover:bg-green-100"
                    >
                      {result}
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Type something to search…</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
