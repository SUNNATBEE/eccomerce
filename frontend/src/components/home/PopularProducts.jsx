import React, { useState } from "react";
import { Link } from "react-router-dom";
import popularProducts from "./PopularProducts.js"; // array joylashgan file
// import ProductCard from "./ProductCard";

const categories = [
  "All",
  "Baking material",
  "Fresh Fruit",
  "Bread and Juice",
  "Fresh Seafood",
  "Clothing & beauty",
];

const PopularProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? popularProducts
      : popularProducts.filter(
          (item) => item.category === activeCategory
        );

  return (
    <div className=" bg-white py-20">
      <div className="max-w-[1240px] w-full m-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Popular Products</h2>

        <ul className="flex items-center gap-5">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cursor-pointer transition font-medium ${
                activeCategory === cat
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-green-500"
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

     {/* Products Grid */}
<div className="grid grid-cols-5 gap-6">
  {filteredProducts.map((item) => (
    <div
      key={item.id}
      className="border-2 border-gray-300 rounded-2xl p-4 hover:shadow-xl transition duration-300 bg-white group relative"
    >
      <Link to={`/product/${item.id}`} className="block">
        {/* Discount badge */}
        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          {item.discount}%
        </span>

        {/* Image */}
        <div className="flex items-center justify-center h-40 mb-4">
          <img
            src={item.image}
            alt={item.title}
            className="h-full object-contain group-hover:scale-105 transition"
          />
        </div>

        {/* Category */}
        <p className="text-gray-400 text-sm">{item.category}</p>

        {/* Title */}
        <h3 className="font-semibold text-lg mt-1 line-clamp-2 text-black">
          {item.title}
        </h3>

        {/* Brand */}
        <p className="text-sm text-gray-500 mt-1">
          By <span className="text-green-600">{item.brand}</span>
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-green-600 font-bold text-lg">
            ${item.price}
          </span>
          <span className="text-gray-400 line-through text-sm">
            ${item.oldPrice}
          </span>
        </div>
      </Link>

      {/* Add button */}
      <button className="mt-4 w-full bg-green-100 text-green-600 py-2 rounded-lg hover:bg-green-500 hover:text-white transition">
        Add
      </button>
    </div>
  ))}
</div>
    </div>
    </div>
  );
};

export default PopularProducts;