/**
 * Shop.jsx - Do'kon sahifasi (mahsulotlar ro'yxati)
 * ====================================================
 * VAZIFA: ABDUVORIS
 * ====================================================
 */

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ShopBanner from "../../components/Shop/ShopBanner";
import FilterBar from "../../components/Shop/FilterBar";
import Sidebar from "../../components/Shop/Sidebar";
import ProductList from "../../components/Shop/ProductList";
import DealsOfTheDay from "../../components/Shop/DealsOfTheDay";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";
  const [viewMode, setViewMode] = useState("grid");

  const handlePageChange = (page) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categoryTabs = ["Cabbage", "Broccoli", "Artichoke", "Celery", "Spinach"];

  return (
    <div className="font-sans bg-white">
      <ShopBanner
        category={category}
        categoryTabs={categoryTabs}
        setSearchParams={setSearchParams}
      />

      <div className="max-w-6xl mx-auto px-6 py-6 pb-16">
        <FilterBar viewMode={viewMode} setViewMode={setViewMode} />

        <div className="flex gap-6 items-start">
          <Sidebar />
          <ProductList
            viewMode={viewMode}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>

        <DealsOfTheDay />
      </div>
    </div>
  );
};

export default Shop;
