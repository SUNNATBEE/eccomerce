/**
 * Shop.jsx - Do'kon sahifasi (mahsulotlar ro'yxati)
 * ====================================================
 * VAZIFA: ABDUVORIS
 * ====================================================
 *
 * Figma UI ga qarab Shop sahifasi 4 xil ko'rinishda bo'ladi:
 * - Shop Grid Right Sidebar (asosiy ko'rinish)
 * - Shop Grid Left Sidebar
 * - List Right Sidebar
 * - List Left Sidebar
 * - Shop Fullwide
 *
 * Sahifa tuzilmasi:
 * ┌──────────────────────────────────────────────────┐
 * │  PageBanner: "Snack" + Kategoriya tablar         │
 * ├──────────────────────────────────────────────────┤
 * │  Filter bar: Ko'rsatish soni | Sort | View toggle│
 * ├───────────────────┬──────────────────────────────┤
 * │  SIDEBAR (chap)   │  MAHSULOTLAR GRID            │
 * │  - Kategoriya     │  (ProductCard ro'yxati)      │
 * │  - Narx filter    │                              │
 * │  - New products   │  [Pagination]                │
 * └───────────────────┴──────────────────────────────┘
 * │  Deals of the Day                                │
 * │  Newsletter Banner                               │
 * └──────────────────────────────────────────────────┘
 *
 * QILISH KERAK BO'LGAN ISHLAR:
 *
 * 1. ShopSidebar komponentini yarating (src/components/shop/ShopSidebar.jsx):
 *    - Kategoriyalar ro'yxati (checkbox bilan)
 *    - Narx diapazoni filtri (range input)
 *    - "New Products" bo'limi (kichik karta)
 *    - Filter o'zgarganda URL Query parametr o'zgartiring
 *
 * 2. ShopFilterBar komponentini yarating (src/components/shop/ShopFilterBar.jsx):
 *    - Chap: "100 ta mahsulot topildi"
 *    - O'rta: Ko'rsatish: 9 | 18 | 36 (select)
 *    - Sort: Mashhur | Narxi: Past-Yuqori | Yangi
 *    - O'ng: Grid/List ko'rinish toggle tugmalari
 *
 * 3. URL Query parametrlar bilan ishlash:
 *    import { useSearchParams } from "react-router-dom";
 *    const [searchParams, setSearchParams] = useSearchParams();
 *    const category = searchParams.get("category") || "";
 *    const page = Number(searchParams.get("page")) || 1;
 *
 * 4. API dan mahsulotlarni oling:
 *    import { getProducts } from "../../services/api";
 *    const params = { page, limit, category, sort, minPrice, maxPrice };
 *    const { data, loading } = useFetch(getProducts, params);
 *
 * 5. Grid va List ko'rinishlarini toggle qiling:
 *    const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
 *
 * DIQQAT: Faqat shu sahifa va src/components/shop/ papkasidagi
 * komponentlarni o'zgartiring!
 */

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../../components/shared/Breadcrumb";
import ProductCard from "../../components/shared/ProductCard";
import Pagination from "../../components/shared/Pagination";
import { FiGrid, FiList } from "react-icons/fi";

const Shop = () => {
  // URL query parametrlarini boshqarish
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";

  // Grid yoki List ko'rinish
  const [viewMode, setViewMode] = useState("grid");

  // TODO: API dan mahsulotlarni oling
  // const { data, loading } = useFetch(getProducts, {
  //   page: currentPage, category, limit: 12
  // });

  const handlePageChange = (page) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* ===== PAGE BANNER ===== */}
      <div className="bg-green-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            {category || "Snack"}
          </h1>
          {/* Kategoriya tablar */}
          <div className="flex gap-2">
            {["Cabbage", "Broccoli", "Wholesome", "Celery", "Spinach"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setSearchParams({ category: tab.toLowerCase(), page: "1" })
                  }
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    category === tab.toLowerCase()
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-green-500"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb items={[{ label: "Shop" }]} />

        {/* ===== FILTER BAR ===== */}
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 mb-4">
          <span className="text-sm text-gray-500">
            {/* TODO: data?.total || 0 */}
            100 ta mahsulot topildi
          </span>
          <div className="flex items-center gap-3">
            {/* Ko'rsatish soni */}
            <select className="text-sm border border-gray-200 rounded px-2 py-1 outline-none">
              <option>Show: 12</option>
              <option>Show: 24</option>
              <option>Show: 48</option>
            </select>
            {/* Sort */}
            <select className="text-sm border border-gray-200 rounded px-2 py-1 outline-none">
              <option>Default</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
            {/* View toggle */}
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded ${
                  viewMode === "grid"
                    ? "bg-green-500 text-white"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <FiGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded ${
                  viewMode === "list"
                    ? "bg-green-500 text-white"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <FiList size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ===== SIDEBAR + MAHSULOTLAR ===== */}
        <div className="flex gap-6">
          {/* SIDEBAR - Chap tomon */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            {/* <ShopSidebar /> */}
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
              <p className="text-sm text-gray-500 mb-3">
                ShopSidebar (Abduvoris):
              </p>
              <p className="text-xs text-gray-400">- Kategoriyalar</p>
              <p className="text-xs text-gray-400">- Narx filtri</p>
              <p className="text-xs text-gray-400">- New Products</p>
            </div>
          </div>

          {/* MAHSULOTLAR */}
          <div className="flex-1">
            {/* Grid ko'rinish */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* TODO: data?.products.map((p) => <ProductCard key={p._id} product={p} />) */}
                {Array(12)
                  .fill(null)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 h-48 flex items-center justify-center text-gray-400 text-xs rounded-lg border-2 border-dashed"
                    >
                      ProductCard #{i + 1}
                    </div>
                  ))}
              </div>
            ) : (
              /* List ko'rinish */
              <div className="space-y-3">
                {Array(6)
                  .fill(null)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 h-24 flex items-center justify-center text-gray-400 text-xs rounded-lg border-2 border-dashed"
                    >
                      List ProductCard #{i + 1} (Abduvoris)
                    </div>
                  ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={8}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        {/* Deals of the Day */}
        <div className="my-8 bg-gray-50 h-32 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed">
          Deals of the Day - Shop sahifasi pastki qismi (Abduvoris)
        </div>
      </div>
    </div>
  );
};

export default Shop;
