import { FiGrid, FiList } from "react-icons/fi";

const FilterBar = ({ viewMode, setViewMode }) => {
    return (
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-2.5 mb-6 flex-wrap gap-2.5 shadow-sm">
            <span className="text-sm text-gray-400">
                <strong className="text-gray-800 font-bold">100</strong> ta mahsulot topildi
            </span>

            <div className="flex items-center gap-2.5">
                {/* Ko'rsatish soni */}
                <select className="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none text-gray-600 bg-white cursor-pointer focus:border-green-400 transition-colors">
                    <option>Show: 12</option>
                    <option>Show: 24</option>
                    <option>Show: 48</option>
                </select>

                {/* Sort */}
                <select className="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none text-gray-600 bg-white cursor-pointer focus:border-green-400 transition-colors">
                    <option>Default sorting</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                </select>

                {/* View Toggle */}
                <div className="flex gap-1 ml-1">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150 cursor-pointer
              ${viewMode === "grid"
                                ? "bg-green-600 text-white"
                                : "text-gray-400 border border-gray-200 hover:text-gray-600 bg-transparent"
                            }`}
                    >
                        <FiGrid size={15} />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150 cursor-pointer
              ${viewMode === "list"
                                ? "bg-green-600 text-white"
                                : "text-gray-400 border border-gray-200 hover:text-gray-600 bg-transparent"
                            }`}
                    >
                        <FiList size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
