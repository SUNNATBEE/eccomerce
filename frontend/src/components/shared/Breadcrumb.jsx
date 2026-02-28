/**
 * Breadcrumb.jsx - Navigatsiya izi (breadcrumb)
 *
 * Sahifa ichidagi yo'l ko'rsatkichi.
 * Masalan: Home > Shop > Snacks
 *
 * Props:
 * @param {Array} items - [ { label: "Home", path: "/" }, { label: "Shop" } ]
 * Oxirgi element faol (bosilmaydigan) bo'ladi.
 *
 * Ishlatilish:
 * const items = [
 *   { label: "Home", path: "/" },
 *   { label: "Shop", path: "/shop" },
 *   { label: "Snacks" },   // Oxirgi - path yo'q
 * ];
 * <Breadcrumb items={items} />
 */

import { Link } from "react-router-dom";
import { FiHome, FiChevronRight } from "react-icons/fi";

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 py-3">
      {/* Home ikonka */}
      <Link
        to="/"
        className="flex items-center hover:text-green-600 transition-colors"
      >
        <FiHome size={14} />
      </Link>

      {/* Dinamik elementlar */}
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <FiChevronRight size={14} className="text-gray-300" />
          {/* Oxirgi element - aktiv, bosilmaydi */}
          {index === items.length - 1 ? (
            <span className="text-gray-700 font-medium">{item.label}</span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-green-600 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
