/**
 * Footer.jsx - Sayt pastki qismi
 *
 * Figma UI ga qarab Footer 3 qismdan iborat:
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  NEWSLETTER BANNER: "Stay home & get your daily needs"  │
 * ├──────────────────────────────────────────────────────────┤
 * │  Logo+Info | Company | Account | Corporate | Install App │
 * ├──────────────────────────────────────────────────────────┤
 * │  Copyright © 2024 | Social Media Icons                  │
 * └──────────────────────────────────────────────────────────┘
 *
 * Bu faylni o'zgartirish kerak EMAS.
 * Hamma jamoaga umumiy.
 */

import { Link } from "react-router-dom";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";

// Footer kolumnlari - Company havolalar
const COMPANY_LINKS = [
  { label: "About Us", path: "/about" },
  { label: "Delivery Information", path: "/" },
  { label: "Privacy Policy", path: "/" },
  { label: "Terms & Conditions", path: "/" },
  { label: "Contact Us", path: "/contact" },
  { label: "Support Center", path: "/" },
];

// Account havolalar
const ACCOUNT_LINKS = [
  { label: "Sign In", path: "/login" },
  { label: "View Cart", path: "/cart" },
  { label: "My Wishlist", path: "/wishlist" },
  { label: "Track My Order", path: "/" },
  { label: "Help", path: "/contact" },
];

// Popular kategoriyalar
const POPULAR_LINKS = [
  { label: "Snack & Spices", path: "/shop" },
  { label: "Instant Food", path: "/shop" },
  { label: "Our Salads", path: "/shop" },
  { label: "Our Fruit", path: "/shop" },
  { label: "Cooking Sause", path: "/shop" },
  { label: "Soda & Water", path: "/shop" },
];

const Footer = () => {
  return (
    <footer className="bg-white mt-auto">
      {/* ===== NEWSLETTER BANNER ===== */}
      <div className="bg-green-500 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Chap matn */}
            <div className="text-white">
              <h3 className="text-xl font-bold">
                Stay home & get your daily needs
              </h3>
              <p className="text-green-100 text-sm">
                Start Your Daily Shopping with{" "}
                <span className="font-bold">Nest Mart</span>
              </p>
            </div>

            {/* Email forma */}
            <form className="flex w-full md:w-auto md:min-w-96">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-l-full text-sm outline-none bg-white text-gray-700"
              />
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-r-full text-sm font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ===== ASOSIY FOOTER ===== */}
      <div className="border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* 1-Kolumn: Logo va Ma'lumotlar */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">N</span>
                </div>
                <span className="text-xl font-bold text-green-600">Nest</span>
              </Link>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                Nest is the largest e-commerce grocery store in Uzbekistan.
                Fresh products delivered to your door.
              </p>
              {/* Aloqa */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiMapPin className="text-green-500 flex-shrink-0" size={14} />
                  <span>123 Amir Temur Street, Tashkent</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiPhone className="text-green-500 flex-shrink-0" size={14} />
                  <span>(+998) 1900-888</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiMail className="text-green-500 flex-shrink-0" size={14} />
                  <span>info@nestmart.uz</span>
                </div>
              </div>
            </div>

            {/* 2-Kolumn: Company */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
              <ul className="space-y-2">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3-Kolumn: Account */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Account</h4>
              <ul className="space-y-2">
                {ACCOUNT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4-Kolumn: Popular */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Popular</h4>
              <ul className="space-y-2">
                {POPULAR_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5-Kolumn: Install App */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Install App</h4>
              <p className="text-xs text-gray-500 mb-3">
                From App Store or Google Play
              </p>

              {/* App Store tugmasi */}
              <a
                href="#"
                className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 mb-2 hover:border-green-500 transition-colors"
              >
                <div className="text-gray-700">
                  <div className="text-xs text-gray-500">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>

              {/* Google Play tugmasi */}
              <a
                href="#"
                className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 hover:border-green-500 transition-colors"
              >
                <div className="text-gray-700">
                  <div className="text-xs text-gray-500">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PASTKI QISM: Copyright + Ijtimoiy tarmoqlar ===== */}
      <div className="border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © 2024{" "}
            <span className="text-green-600 font-medium">Nest Mart</span>. All
            rights reserved.
          </p>

          {/* Ijtimoiy tarmoqlar */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors"
            >
              <FiFacebook size={14} />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors"
            >
              <FiTwitter size={14} />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors"
            >
              <FiInstagram size={14} />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors"
            >
              <FiYoutube size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
