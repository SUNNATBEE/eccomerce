/**
 * Header.jsx - Sayt sarlavhasi (Navigatsiya)
 *
 * Figma UI ga qarab:
 * ┌─────────────────────────────────────────────────────────┐
 * │  TOP BAR: Til tanlash | Valyuta | Login/Register links  │
 * ├─────────────────────────────────────────────────────────┤
 * │  LOGO | Qidiruv | Buyurtmalar | Sevimlillar | Savatcha  │
 * ├─────────────────────────────────────────────────────────┤
 * │  Browse All Categories | Home | About | Shop | Blog ... │
 * └─────────────────────────────────────────────────────────┘
 *
 * Ishlatilgan kutubxonalar:
 * - react-router-dom: NavLink (active link uchun)
 * - react-icons: ikonlar uchun
 *
 * Bu faylni o'zgartirish kerak EMAS.
 * Hamma jamoaga umumiy.
 */

import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
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

// Navigatsiya linklari - yangi sahifa qo'shilsa shu yerga yozing
const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/shop", label: "Shop" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  // Mobil menyu ochiq/yopiq holati
  const [mobileOpen, setMobileOpen] = useState(false);
  // Qidiruv maydoni qiymati
  const [searchQuery, setSearchQuery] = useState("");

  // Qidiruv formasi submit bo'lganda
  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Qidiruv funksionalligi qo'shing
    console.log("Qidirildi:", searchQuery);
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* ===== 1-QISM: TOP BAR ===== */}
      <div className="bg-[#f4f6fa] py-2 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Chap tomon - til va valyuta */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 cursor-pointer hover:text-green-600">
              Eng <FiChevronDown size={12} />
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-green-600">
              USD <FiChevronDown size={12} />
            </span>
          </div>

          {/* O'ng tomon - login/register */}
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

      {/* ===== 2-QISM: LOGO + QIDIRUV + IKONLAR ===== */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-xl font-bold text-green-600">Nest</span>
          </Link>

          {/* Qidiruv qutisi */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-2xl hidden md:flex"
          >
            <div className="flex w-full border border-gray-300 rounded-full overflow-hidden">
              {/* Kategoriya tanlash */}
              <select className="px-3 py-2 text-sm bg-white border-r border-gray-300 outline-none text-gray-600">
                <option>All Categories</option>
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Snacks</option>
                <option>Beverages</option>
              </select>

              {/* Qidiruv input */}
              <input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 text-sm outline-none"
              />

              {/* Qidiruv tugmasi */}
              <button
                type="submit"
                className="px-5 bg-green-500 hover:bg-green-600 transition-colors text-white"
              >
                <FiSearch size={18} />
              </button>
            </div>
          </form>

          {/* O'ng tomon - ikonlar */}
          <div className="flex items-center gap-4">
            {/* Telefon raqam */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600">
              <FiPhone className="text-green-500" />
              <span>1900 - 888</span>
            </div>

            {/* Sevimlillar */}
            <Link
              to="/wishlist"
              className="relative flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors"
            >
              <FiHeart size={22} />
              <span className="text-xs hidden md:block">Wishlist</span>
              {/* Badge - sevimlillar soni */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Savatcha */}
            <Link
              to="/cart"
              className="relative flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors"
            >
              <FiShoppingCart size={22} />
              <span className="text-xs hidden md:block">Cart</span>
              {/* Badge - savatcadagi mahsulotlar soni */}
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Profil */}
            <Link
              to="/profile"
              className="flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors"
            >
              <FiUser size={22} />
              <span className="text-xs hidden md:block">Account</span>
            </Link>

            {/* Mobil menyu tugmasi */}
            <button
              className="md:hidden text-gray-600"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ===== 3-QISM: ASOSIY NAVIGATSIYA ===== */}
      <nav className="bg-white border-t border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1">
            {/* Browse All Categories tugmasi */}
            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 text-sm font-medium transition-colors">
              <FiMenu size={16} />
              Browse All Categories
            </button>

            {/* Nav linklari */}
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
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

      {/* ===== MOBIL MENYU ===== */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
          {/* Mobil qidiruv */}
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

          {/* Mobil nav linklari */}
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-sm font-medium border-b border-gray-100 ${
                  isActive ? "text-green-600" : "text-gray-700"
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
