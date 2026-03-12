import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

const ProductListCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all group">
      {/* Image Section */}
      <div className="relative w-full md:w-64 h-48 bg-gray-50 rounded-xl overflow-hidden shrink-0">
        {product.badge && (
          <span className="absolute top-0 left-0 bg-pink-500 text-white text-xs px-4 py-1 rounded-br-xl z-10">
            {product.badge}
          </span>
        )}
        <Link to={`/product/${product._id}`} className="w-full h-full flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col">
        <span className="text-xs text-gray-400 mb-1 block">Hodo Foods</span>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-xl font-bold text-[#253D4E] hover:text-green-600 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <FiStar
              key={s}
              size={14}
              className={s <= (product.rating || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.rating?.toFixed(1) || "4.0"})</span>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
          {product.description || "No short description available."}
        </p>

        {/* Price and Buttons */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-green-600">${product.price?.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through">${product.oldPrice?.toFixed(2)}</span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                addToCart(product);
                toast.success(`${product.name} added to cart!`);
              }}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
            >
              <FiShoppingCart size={18} />
              Add
            </button>
            <button className="p-2.5 border border-gray-100 rounded-lg hover:bg-pink-50 hover:text-pink-500 transition-all">
              <FiHeart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;