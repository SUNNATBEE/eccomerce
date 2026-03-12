import { HiHome } from "react-icons/hi";

const ShopBanner = ({ category, categoryTabs, setSearchParams }) => {
    return (
        <div className="relative overflow-hidden min-h-40 py-10 bg-linear-to-br from-green-50 via-lime-50 to-teal-50">
            {/* Decorative SVG */}
            <svg
                className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none"
                viewBox="0 0 700 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <ellipse cx="120" cy="130" rx="28" ry="18" fill="#81c784" />
                <rect x="111" y="130" width="18" height="30" rx="5" fill="#a5d6a7" />
                <ellipse cx="120" cy="130" rx="28" ry="18" fill="#66bb6a" />
                <ellipse cx="260" cy="60" rx="32" ry="26" fill="#66bb6a" opacity="0.5" />
                <ellipse cx="278" cy="72" rx="22" ry="18" fill="#43a047" opacity="0.4" />
                <rect x="254" y="80" width="12" height="22" rx="4" fill="#81c784" />
                <path d="M400 40 Q440 10 480 60 Q440 80 400 40Z" fill="#a5d6a7" opacity="0.6" />
                <path d="M550 30 L565 90 L545 90Z" fill="#ff8a65" opacity="0.55" />
                <path d="M550 30 Q555 10 560 28" stroke="#66bb6a" strokeWidth="2" fill="none" opacity="0.6" />
                <ellipse cx="620" cy="120" rx="18" ry="10" fill="#81c784" opacity="0.3" transform="rotate(-30 620 120)" />
                <ellipse cx="80" cy="60" rx="14" ry="8" fill="#a5d6a7" opacity="0.35" transform="rotate(20 80 60)" />
                <ellipse cx="320" cy="150" rx="20" ry="10" fill="#66bb6a" opacity="0.25" transform="rotate(-15 320 150)" />
                <ellipse cx="480" cy="140" rx="16" ry="20" fill="#ef9a9a" opacity="0.45" />
                <path d="M480 120 Q484 105 488 110" stroke="#66bb6a" strokeWidth="2" fill="none" opacity="0.5" />
            </svg>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    {/* Left: Title + Breadcrumb */}
                    <div>
                        <h1 className="text-3xl font-extrabold text-green-900 mb-2 tracking-tight leading-tight">
                            {category
                                ? category.charAt(0).toUpperCase() + category.slice(1)
                                : "Snack"}
                        </h1>

                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-1.5 text-sm text-gray-500">
                            <span className="flex items-center gap-1 text-green-600">
                                <HiHome size={14} />
                                <a href="/" className="text-green-600 no-underline font-medium hover:underline">
                                    Home
                                </a>
                            </span>
                            <span className="text-gray-300">›</span>
                            <a href="/shop" className="text-gray-500 no-underline hover:text-green-600 transition-colors">
                                Shop
                            </a>
                            <span className="text-gray-300">›</span>
                            <span className="text-gray-700 font-semibold">
                                {category
                                    ? category.charAt(0).toUpperCase() + category.slice(1)
                                    : "Snack"}
                            </span>
                        </nav>
                    </div>

                    {/* Right: Category pill tabs */}
                    <div className="flex flex-wrap gap-2.5 items-center">
                        {categoryTabs.map((tab) => {
                            const isActive = category === tab.toLowerCase();
                            return (
                                <button
                                    key={tab}
                                    onClick={() =>
                                        setSearchParams({ category: tab.toLowerCase(), page: "1" })
                                    }
                                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm cursor-pointer transition-all duration-200
                    ${isActive
                                            ? "bg-green-600 text-white font-bold shadow-md border-transparent"
                                            : "bg-white text-gray-700 font-medium border border-gray-300 hover:border-green-500 hover:text-green-600 shadow-sm"
                                        }`}
                                >
                                    <span className="text-xs opacity-60">✕</span>
                                    {tab}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopBanner;
