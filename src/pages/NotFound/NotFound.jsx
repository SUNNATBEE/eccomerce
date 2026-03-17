/**
 * NotFound.jsx - 404 sahifasi
 * Topilmagan URL ga kirganda ko'rsatiladi.
 * Bu faylni o'zgartirish shart emas.
 */

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 text-center px-4">
      <div className="text-8xl font-bold text-green-200 mb-4">404</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Sahifa topilmadi
      </h1>
      <p className="text-gray-500 mb-6">
        Siz izlagan sahifa mavjud emas yoki o'chirilgan.
      </p>
      <Link
        to="/"
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
};

export default NotFound;
