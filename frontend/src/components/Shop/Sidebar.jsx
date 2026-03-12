import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { getCategories, getProducts } from '../../services/api';

const Sidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentCategory = searchParams.get("category") || "";
    const [price, setPrice] = useState(searchParams.get("maxPrice") || 1000);

    const { data: categories, loading: catLoading } = useFetch(getCategories);
    const { data: newProductsData } = useFetch(getProducts, { limit: 3, sort: 'newest' });

    const handleCategoryChange = (cat) => {
        if (currentCategory === cat) {
            searchParams.delete("category");
        } else {
            searchParams.set("category", cat);
        }
        searchParams.set("page", 1);
        setSearchParams(searchParams);
    };

    const handlePriceFilter = () => {
        searchParams.set("maxPrice", price);
        searchParams.set("page", 1);
        setSearchParams(searchParams);
    };

    const categoriesList = categories || [
        { name: "Vegetables", count: 12 },
        { name: "Fruits", count: 12 },
        { name: "Snack", count: 12 },
        { name: "Beverages", count: 12 },
        { name: "Dairy", count: 12 },
        { name: "Bakery", count: 12 }
    ];

    const newProducts = newProductsData?.products || [];

    return (
        <div className="hidden lg:block w-64 shrink-0 space-y-6">
            {/* Categories */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-[#253D4E] mb-4 pb-3 border-b border-gray-50 flex items-center justify-between">
                    Categories
                </h3>
                <div className="space-y-1">
                    {catLoading ? (
                        <div className="text-sm text-gray-400 py-2">Loading...</div>
                    ) : (
                        categoriesList.map((cat) => {
                            const catName = typeof cat === 'string' ? cat : cat.name;
                            const catCount = typeof cat === 'string' ? 12 : (cat.count || 0);
                            const isActive = currentCategory === catName;

                            return (
                                <label key={catName} className="flex items-center gap-3 py-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={() => handleCategoryChange(catName)}
                                        className="accent-[#3BB77E] w-4 h-4 cursor-pointer rounded"
                                    />
                                    <span className={`text-sm flex-1 transition-all ${isActive ? "text-[#3BB77E] font-bold" : "text-gray-500 group-hover:text-[#3BB77E]"}`}>
                                        {catName}
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full transition-all ${isActive ? "bg-[#DEF9EC] text-[#3BB77E]" : "bg-gray-50 text-gray-400"}`}>
                                        {catCount}
                                    </span>
                                </label>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-[#253D4E] mb-4 pb-3 border-b border-gray-50">
                    Fill by Price
                </h3>
                <div className="px-1">
                    <input
                        type="range"
                        min={0}
                        max={1000}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full h-1.5 bg-[#DEF9EC] rounded-lg appearance-none cursor-pointer accent-[#3BB77E]"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-3 font-medium">
                        <span>$0</span>
                        <span className="text-[#3BB77E] font-bold text-sm">${price}</span>
                        <span>$1000</span>
                    </div>
                </div>
                <button
                    onClick={handlePriceFilter}
                    className="mt-5 w-full py-3 bg-[#3BB77E] hover:bg-[#253D4E] text-white text-sm font-bold rounded-xl cursor-pointer transition-all shadow-[0_4px_12px_rgba(59,183,126,0.2)] active:scale-95"
                >
                    Filter
                </button>
            </div>

            {/* New Products */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-[#253D4E] mb-4 pb-3 border-b border-gray-50">
                    New Products
                </h3>
                <div className="space-y-4">
                    {newProducts.map((product, idx) => (
                        <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className={`flex gap-3 items-center group transition-all ${idx < newProducts.length - 1 ? "pb-4 border-b border-gray-50" : ""}`}
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-xl p-1 flex items-center justify-center shrink-0 border border-transparent group-hover:border-[#DEF9EC] transition-all">
                                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-xs font-bold text-[#253D4E] leading-snug group-hover:text-[#3BB77E] transition-colors truncate">
                                    {product.name}
                                </h4>
                                <div className="text-sm text-[#3BB77E] font-extrabold mt-1">${product.price.toFixed(2)}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
