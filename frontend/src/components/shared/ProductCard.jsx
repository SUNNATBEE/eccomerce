import { Link } from "react-router-dom";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  // Savatchaga qo'shish
  const handleAddToCart = (e) => {
    e.preventDefault();
    toast.success(`${product?.name} savatchaga qo'shildi!`);
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-green-200 transition-all duration-300 relative flex flex-col h-full">
      {/* ===== BADGE (NEW, HOT, SALE) ===== */}
      {product?.badge && (
        <span
          className={`absolute top-0 left-0 z-10 text-white text-[10px] font-bold px-4 py-1.5 rounded-br-2xl rounded-tl-2xl ${product.badge === "New"
            ? "bg-[#3BB77E]"
            : product.badge === "Hot"
              ? "bg-[#FD6E6E]"
              : product.badge === "Sale"
                ? "bg-[#67bcee]"
                : "bg-[#f74b81]"
            }`}
        >
          {product.badge}
        </span>
      )}

      {/* Chegirma foizi */}
      {product?.discount && (
        <span className="absolute top-0 right-0 z-10 bg-[#f74b81] text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl rounded-tr-2xl">
          {product.discount}
        </span>
      )}

      {/* ===== RASM ===== */}
      <Link to={`/product/${product?._id}`} className="block p-3 mt-2">
        <div className="relative h-32 flex items-center justify-center overflow-hidden">
          <img
            src={product?.image || "/placeholder-product.jpg"}
            alt={product?.name}
            className="h-full object-contain group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </Link>

      {/* ===== KONTENT ===== */}
      <div className="p-4 pt-0 flex flex-col grow">
        {/* Kategoriya */}
        <span className="text-[11px] text-[#ADADAD] mb-1">
          {product?.category || "Category"}
        </span>

        {/* Mahsulot nomi */}
        <Link to={`/product/${product?._id}`} className="mb-2 min-h-[40px]">
          <h3 className="text-[15px] text-[#253D4E] font-bold line-clamp-2 leading-tight hover:text-[#3BB77E] transition-colors">
            {product?.name || "Mahsulot nomi"}
          </h3>
        </Link>

        {/* Reyting yulduzlari */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                size={12}
                className={
                  star <= Math.floor(product?.rating || 0)
                    ? "text-[#FDC040] fill-[#FDC040]"
                    : "text-[#D1D1D1]"
                }
              />
            ))}
          </div>
          <span className="text-[12px] text-[#ADADAD]">({product?.rating?.toFixed(1) || "0.0"})</span>
        </div>

        {/* Vendor */}
        <div className="mb-3">
          <span className="text-[12px] text-[#ADADAD]">By </span>
          <span className="text-[12px] text-[#3BB77E] hover:text-[#253D4E] cursor-pointer">
            {product?.vendor || "NestFood"}
          </span>
        </div>

        {/* Narx va tugma */}
        <div className="flex items-center justify-between mt-auto gap-2">
          <div className="flex flex-col">
            <span className="text-[#3BB77E] font-bold text-lg leading-none">
              ${product?.price?.toFixed(2) || "0.00"}
            </span>
            {product?.oldPrice && (
              <span className="text-[#ADADAD] text-xs line-through mt-0.5">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Savatchaga qo'shish */}
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-[#DEF9EC] hover:bg-[#3BB77E] text-[#3BB77E] hover:text-white text-[13px] font-bold px-3 py-2 rounded transition-all duration-300 whitespace-nowrap"
          >
            <FiShoppingCart size={15} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
