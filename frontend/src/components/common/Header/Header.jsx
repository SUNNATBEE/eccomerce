/**
 * Header.jsx - Site Header (Navigation)
 *
 * Based on Figma UI:
 * ┌─────────────────────────────────────────────────────────┐
 * │  TOP BAR: Language | Currency | Login/Register links     │
 * ├─────────────────────────────────────────────────────────┤
 * │  LOGO | Search | Orders | Wishlist | Cart                │
 * ├─────────────────────────────────────────────────────────┤
 * │  Browse All Categories | Home | About | Shop | Blog ... │
 * └─────────────────────────────────────────────────────────┘
 *
 * Libraries used:
 * - react-router-dom: NavLink (for active links)
 * - react-icons: for icons
 */

import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiPhone,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";

// Navigation links - add new pages here
const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/shop", label: "Shop" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  const { cartCount } = useCart();
  // Mobil menyu ochiq/yopiq holati
  const [mobileOpen, setMobileOpen] = useState(false);
  // Qidiruv maydoni qiymati
  const [searchQuery, setSearchQuery] = useState("");

  // Qidiruv formasi submit bo'lganda
  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Add search functionality
    console.log("Searched:", searchQuery);
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* ===== PART 1: TOP BAR ===== */}
      <div className="bg-[#f4f6fa] py-2 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Left side - language and currency */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 cursor-pointer hover:text-green-600">
              Eng <FiChevronDown size={12} />
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-green-600">
              USD <FiChevronDown size={12} />
            </span>
          </div>

          {/* Right side - login/register */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-green-600 transition-colors">
              Login
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/register" className="hover:text-green-600 transition-colors">
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* ===== PART 2: LOGO + SEARCH + ICONS ===== */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-xl font-bold text-green-600">Nest</span>
          </Link>

          {/* Search box */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-2xl hidden md:flex"
          >
            <div className="flex w-full border border-gray-300 rounded-full overflow-hidden">
              {/* Category selection */}
              <select className="px-3 py-2 text-sm bg-white border-r border-gray-300 outline-none text-gray-600">
                <option>All Categories</option>
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Snacks</option>
                <option>Beverages</option>
              </select>

              {/* Search input */}
              <input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 text-sm outline-none"
              />

              {/* Search button */}
              <button
                type="submit"
                className="px-5 bg-green-500 hover:bg-green-600 transition-colors text-white"
              >
                <FiSearch size={18} />
              </button>
            </div>
          </form>

          {/* Right side - icons */}
          <div className="flex items-center gap-4">
            {/* Phone number */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600">
              <FiPhone className="text-green-500" />
              <span>1900 - 888</span>
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors"
            >
              <FiHeart size={22} />
              <span className="text-xs hidden md:block">Wishlist</span>
              {/* Badge - wishlist count */}
              {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span> */}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors"
            >
              <FiShoppingCart size={22} />
              <span className="text-xs hidden md:block">Cart</span>
              {/* Badge - cart items count */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              className="flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors"
            >
              <FiUser size={22} />
              <span className="text-xs hidden md:block">Account</span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ===== PART 3: MAIN NAVIGATION ===== */}
      <nav className="bg-white border-t border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1">
            {/* Browse All Categories button */}
            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 text-sm font-medium transition-colors">
              <FiMenu size={16} />
              Browse All Categories
            </button>

            {/* Nav links */}
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium transition-colors ${isActive
                    ? "text-green-600 border-b-2 border-green-500"
                    : "text-gray-700 hover:text-green-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* ===== MOBILE MENU ===== */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="flex mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-3 rounded-r"
            >
              <FiSearch size={16} />
            </button>
          </form>

          {/* Mobile nav links */}
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-sm font-medium border-b border-gray-100 ${isActive ? "text-green-600" : "text-gray-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
