/**
 * Pagination.jsx - Sahifalar almashtirish komponenti
 *
 * Ko'p mahsulot yoki blog postlar uchun sahifalar.
 * Figma da ko'ringan: ← 1 2 [3] 4 5 →
 *
 * Props:
 * @param {number} currentPage  - Hozirgi sahifa raqami
 * @param {number} totalPages   - Jami sahifalar soni
 * @param {function} onPageChange - Sahifa o'zgarganda chaqiriladigan funksiya
 *
 * Ishlatilish:
 * <Pagination
 *   currentPage={page}
 *   totalPages={10}
 *   onPageChange={(p) => setPage(p)}
 * />
 */

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  // Oldingi sahifaga o'tish
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  // Keyingi sahifaga o'tish
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Ko'rsatiladigan sahifa raqamlarini hisoblash
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 py-6">
      {/* Oldingi tugma */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:border-green-500 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <FiChevronLeft size={16} />
      </button>

      {/* Sahifa raqamlari */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
            currentPage === page
              ? "bg-green-500 text-white border border-green-500"
              : "border border-gray-200 hover:border-green-500 hover:text-green-600"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Keyingi tugma */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:border-green-500 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <FiChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
