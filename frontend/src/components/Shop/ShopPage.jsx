import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiGrid, FiList } from "react-icons/fi";

// Komponentlar
import ShopBanner from './ShopBanner';
import Sidebar from './Sidebar';
import ProductListCard from './ProductListCard';
import ProductCard from './ProductCard'; // Bu sizdagi Grid ko'rinishi
import Pagination from './Pagination';
import DealsOfTheDay from './DealsOfTheDay';

// API/Hook
import useFetch from '../hooks/useFetch';
import { getProducts } from '../services/api';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("list"); // Rasmda list tanlangan edi

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "default";
  const currentLimit = Number(searchParams.get("limit")) || 10;
  const minPrice = searchParams.get("minPrice") || 0;
  const maxPrice = searchParams.get("maxPrice") || 1000;

  const { data, loading } = useFetch(getProducts, {
    page: currentPage,
    category: currentCategory,
    limit: currentLimit,
    sort: currentSort !== "default" ? currentSort : undefined,
    minPrice: minPrice,
    maxPrice: maxPrice,
  });

  const handleParamChange = (name, value) => {
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    searchParams.set("page", 1); // Reset to page 1 on filter
    setSearchParams(searchParams);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <ShopBanner
        category={currentCategory}
        categoryTabs={["Cabbage", "Broccoli", "Artichoke", "Celery", "Spinach"]}
        setSearchParams={setSearchParams}
      />

      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        <aside className="w-full lg:w-1/4 shrink-0">
          <Sidebar />
        </aside>

        <main className="flex-1">
          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-8 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
            <p className="text-sm text-gray-500">
              We found <span className="text-green-600 font-bold">{data?.total || 0}</span> products for you!
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Show:</span>
                <select
                  value={currentLimit}
                  onChange={(e) => handleParamChange("limit", e.target.value)}
                  className="text-sm font-bold text-gray-700 outline-none cursor-pointer bg-transparent"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select
                  value={currentSort}
                  onChange={(e) => handleParamChange("sort", e.target.value)}
                  className="text-sm font-bold text-gray-700 outline-none cursor-pointer bg-transparent"
                >
                  <option value="default">Default sorting</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {/* VIEW SWITCHER */}
              <div className="flex gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-green-600 text-white shadow-md" : "text-gray-400 hover:text-green-600"}`}
                >
                  <FiGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-green-600 text-white shadow-md" : "text-gray-400 hover:text-green-600"}`}
                >
                  <FiList size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Mahsulotlar */}
          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : (
            <div className={viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              : "flex flex-col gap-6"
            }>
              {data?.products?.map((item) => (
                viewMode === "grid"
                  ? <ProductCard key={item._id} product={item} />
                  : <ProductListCard key={item._id} product={item} />
              ))}
            </div>
          )}

          <div className="mt-12">
            <Pagination
              total={data?.totalPages}
              current={currentPage}
              onChange={(p) => {
                searchParams.set("page", p);
                setSearchParams(searchParams);
              }}
            />
          </div>
        </main>
      </div>

      <div className="mt-20">
        <DealsOfTheDay />
      </div>
    </div>
  );
};

export default ShopPage;