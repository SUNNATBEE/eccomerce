const Sidebar = () => {
    return (
        <div className="hidden lg:block w-56 shrink-0 space-y-4">
            {/* Categories */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2.5 border-b border-gray-100">
                    Kategoriyalar
                </h3>
                {["Vegetables", "Fruits", "Snack", "Beverages", "Dairy", "Bakery"].map((cat) => (
                    <label key={cat} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                        <input
                            type="checkbox"
                            defaultChecked={cat === "Snack"}
                            className="accent-green-600 w-3.5 h-3.5 cursor-pointer"
                        />
                        <span className="text-sm text-gray-500 flex-1 group-hover:text-gray-800 transition-colors">
                            {cat}
                        </span>
                        <span className="text-xs text-gray-300">(12)</span>
                    </label>
                ))}
            </div>

            {/* Price Filter */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2.5 border-b border-gray-100">
                    Narx diapazoni
                </h3>
                <input
                    type="range"
                    min={0}
                    max={1000}
                    defaultValue={500}
                    className="w-full accent-green-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                    <span>$0</span>
                    <span>$500</span>
                    <span>$1000</span>
                </div>
                <button className="mt-3 w-full py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg cursor-pointer transition-colors">
                    Filter
                </button>
            </div>

            {/* New Products */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2.5 border-b border-gray-100">
                    Yangi mahsulotlar
                </h3>
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`flex gap-2.5 items-center py-2 ${i < 3 ? "border-b border-gray-50" : ""}`}
                    >
                        <div className="w-12 h-12 bg-green-50 rounded-lg shrink-0" />
                        <div>
                            <div className="text-xs font-semibold text-gray-700 leading-snug">
                                Fresh Product #{i}
                            </div>
                            <div className="text-xs text-green-600 font-bold mt-0.5">$4.99</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
