/**
 * ProductCard.jsx - Mahsulot kartochkasi
 *
 * Bu komponent barcha sahifalar uchun umumiy mahsulot kartochkasi.
 * Shop, Home, ProductDetail va boshqa sahifalarda ishlatiladi.
 *
 * Props (qabul qilinadigan ma'lumotlar):
 * @param {object} product - Mahsulot ma'lumotlari
 * @param {string} product._id       - Mahsulot IDsi (API dan keladi)
 * @param {string} product.name      - Mahsulot nomi
 * @param {string} product.image     - Rasm URL
 * @param {number} product.price     - Narx
 * @param {number} product.oldPrice  - Eski narx (chegirma uchun)
 * @param {number} product.rating    - Reyting (1-5)
 * @param {number} product.sold      - Sotilgan soni
 * @param {boolean} product.inStock  - Stokda bormi
 * @param {string} product.badge     - "NEW", "HOT", "SALE" kabi
 *
 * Ishlatilish namunasi:
 * <ProductCard product={mahsulot} />
 */

import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye, FiStar } from "react-icons/fi";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  // Savatchaga qo'shish
  const handleAddToCart = (e) => {
    e.preventDefault(); // Link navigatsiyasini to'xtatish
    // TODO: CartContext ga mahsulot qo'shing
    toast.success(`${product?.name} savatchaga qo'shildi!`);
  };

  // Sevimlilarga qo'shish
  const handleAddToWishlist = (e) => {
    e.preventDefault();
    // TODO: WishlistContext ga mahsulot qo'shing
    toast.info(`${product?.name} sevimlilarga qo'shildi!`);
  };

  // Chegirma foizini hisoblash
  const discountPercent =
    product?.oldPrice && product?.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 relative">
      {/* ===== BADGE (NEW, HOT, SALE) ===== */}
      {product?.badge && (
        <span
          className={`absolute top-2 left-2 z-10 text-white text-xs font-bold px-2 py-1 rounded ${
            product.badge === "NEW"
              ? "bg-green-500"
              : product.badge === "HOT"
              ? "bg-red-500"
              : "bg-orange-500"
          }`}
        >
          {product.badge}
        </span>
      )}

      {/* Chegirma foizi */}
      {discountPercent > 0 && (
        <span className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{discountPercent}%
        </span>
      )}

      {/* ===== RASM ===== */}
      <Link to={`/product/${product?._id}`} className="block overflow-hidden">
        <div className="relative h-44 bg-gray-50 flex items-center justify-center p-4">
          <img
            src={product?.image || "/placeholder-product.jpg"}
            alt={product?.name}
            className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          {/* Hover qilganda chiqadigan tugmalar */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            {/* Ko'rish */}
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-green-500 hover:text-white transition-colors">
              <FiEye size={14} />
            </button>
            {/* Sevimlillar */}
            <button
              onClick={handleAddToWishlist}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-green-500 hover:text-white transition-colors"
            >
              <FiHeart size={14} />
            </button>
          </div>
        </div>
      </Link>

      {/* ===== KONTENT ===== */}
      <div className="p-3">
        {/* Mahsulot nomi */}
        <Link to={`/product/${product?._id}`}>
          <h3 className="text-sm text-gray-700 font-medium line-clamp-2 hover:text-green-600 transition-colors mb-1">
            {product?.name || "Mahsulot nomi"}
          </h3>
        </Link>

        {/* Reyting yulduzlari */}
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              size={12}
              className={
                star <= (product?.rating || 0)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="text-xs text-gray-400">({product?.sold || 0})</span>
        </div>

        {/* Narx va tugma */}
        <div className="flex items-center justify-between">
          <div>
            {/* Asosiy narx */}
            <span className="text-green-600 font-bold text-sm">
              ${product?.price?.toFixed(2) || "0.00"}
            </span>
            {/* Eski narx */}
            {product?.oldPrice && (
              <span className="text-gray-400 text-xs line-through ml-1">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Savatchaga qo'shish */}
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-full transition-colors"
          >
            <FiShoppingCart size={12} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
