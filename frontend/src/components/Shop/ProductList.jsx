import React from "react";
import { Link } from "react-router-dom"; // For navigation
import { FiStar, FiShoppingCart } from "react-icons/fi"; // Icons
import ProductCard from "../shared/ProductCard";
import Pagination from "../shared/Pagination";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

const MOCK_PRODUCTS = [
    {
        _id: "1",
        name: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
        category: "Snack",
        image: "https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-1-1.jpg",
        price: 28.85,
        oldPrice: 32.8,
        rating: 4.0,
        vendor: "NestFood",
        badge: "Hot"
    },
    {
        _id: "2",
        name: "All Natural Italian-Style Chicken Meatballs",
        category: "Hoda Foods",
        image: "https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-2-1.jpg",
        price: 52.85,
        oldPrice: 55.8,
        rating: 3.5,
        vendor: "Stouffer",
        badge: "Sale"
    },
    {
        _id: "3",
        name: "Angie's Boomchickapop Sweet & Salty Kettle Corn",
        category: "Snack",
        image: "https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-3-1.jpg",
        price: 48.85,
        oldPrice: 52.8,
        rating: 4.0,
        vendor: "StarKist",
        badge: "New"
    },
    {
        _id: "4",
        name: "Foster Farms Takeout Crispy Classic Buffalo Wings",
        category: "Vegetables",
        image: "https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-4-1.jpg",
        price: 17.85,
        oldPrice: 19.8,
        rating: 4.0,
        vendor: "NestFood"
    },
    {
        _id: "5",
        name: "Blue Diamond Almonds Lightly Salted Vegetables",
        category: "Pet Foods",
        image: "https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-5-1.jpg",
        price: 23.85,
        oldPrice: 25.8,
        rating: 4.0,
        vendor: "NestFood",
        discount: "-14%"
    },
    {
        _id: "6",
        name: "Chobani Complete Vanilla Greek Yogurt",
        category: "Hoda Foods",
        image: "https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-6-1.jpg",
        price: 54.85,
        oldPrice: 55.8,
        rating: 4.0,
        vendor: "NestFood"
    },
    {
        _id: "7",
        name: "Canada Dry Ginger Ale - 2 L Bottle",
        category: "Meats",
        image: "https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-7-1.jpg",
        price: 32.85,
        oldPrice: 33.8,
        rating: 4.0,
        vendor: "NestFood"
    },
    {
        _id: "8",
        name: "Encore Seafoods Stuffed Alaskan Salmon",
        category: "Snack",
        image: "https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-8-1.jpg",
        price: 35.85,
        oldPrice: 37.8,
        rating: 4.0,
        vendor: "NestFood",
        badge: "Sale"
    },
    {
        _id: "9",
        name: "Gorton's Beer Battered Fish Fillets",
        category: "Coffes",
        image: "https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-9-1.jpg",
        price: 23.85,
        oldPrice: 25.8,
        rating: 4.0,
        vendor: "Old El Paso",
        badge: "Hot"
    },
    {
        _id: "10",
        name: "Haagen-Dazs Caramel Cone Ice Cream",
        category: "Cream",
        image: "https://nest-frontend-v6.vercel.app/assets/imgs/shop/product-10-1.jpg",
        price: 22.85,
        oldPrice: 24.8,
        rating: 2.0,
        vendor: "Tyson"
    }
];

const ProductList = ({ viewMode, currentPage, handlePageChange }) => {
    const { addToCart } = useCart();
    return (
        <div className="flex-1 min-w-0">
            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
                    {MOCK_PRODUCTS.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                    {MOCK_PRODUCTS.map((product) => (
                        <ProductCard key={product._id + "-copy"} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {MOCK_PRODUCTS.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-6 hover:shadow-lg transition-all duration-300"
                        >
                            {/* Navigate to product detail on image click */}
                            <Link to={`/product/${product._id}`} className="w-32 h-32 shrink-0 overflow-hidden rounded-lg">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain hover:scale-110 transition-transform duration-500"
                                />
                            </Link>

                            <div className="grow">
                                <span className="text-xs text-[#ADADAD]">{product.category}</span>

                                {/* Navigate to product detail on name click */}
                                <Link to={`/product/${product._id}`}>
                                    <h3 className="text-lg font-bold text-[#253D4E] hover:text-[#3BB77E] transition-colors leading-tight mb-2">
                                        {product.name}
                                    </h3>
                                </Link>

                                <div className="flex items-center gap-2 my-2">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FiStar
                                                key={star}
                                                size={12}
                                                className={star <= product.rating ? "text-[#FDC040] fill-[#FDC040]" : "text-[#D1D1D1]"}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-[#ADADAD]">({product.rating.toFixed(1)})</span>
                                </div>
                                <div className="text-sm text-[#ADADAD]">By <span className="text-[#3BB77E]">{product.vendor}</span></div>
                            </div>

                            <div className="flex flex-col items-end gap-3 min-w-[140px]">
                                <div className="flex flex-col items-end">
                                    <span className="text-2xl font-bold text-[#3BB77E]">${product.price.toFixed(2)}</span>
                                    {product.oldPrice && (
                                        <span className="text-sm text-[#ADADAD] line-through">${product.oldPrice.toFixed(2)}</span>
                                    )}
                                </div>
                                <button
                                    onClick={() => {
                                        addToCart(product);
                                        toast.success(`${product.name} added to cart!`);
                                    }}
                                    className="flex items-center gap-2 bg-[#3BB77E] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#29A56C] transition-all shadow-sm active:scale-95"
                                >
                                    <FiShoppingCart />
                                    Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="mt-12">
                <Pagination
                    currentPage={currentPage}
                    totalPages={8}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ProductList;