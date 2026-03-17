/**
 * ProductDetail.jsx - Bitta mahsulot batafsil sahifasi
 * ====================================================
 * VAZIFA: AZIZA
 * ====================================================
 *
 * Figma UI ga qarab Single Product View sahifasi:
 *
 * YUQORI QISM:
 * 1. Breadcrumb       - Home > Vegetables & Fruits > Mahsulot nomi
 * 2. ProductGallery   - Chap: katta rasm + pastda kichik rasmlar (thumbnail)
 * 3. ProductInfo      - O'ng tomon:
 *    - Kategoriya badge
 *    - Mahsulot nomi (sarlavha)
 *    - Reyting yulduzlari + sotilgan soni
 *    - Narx (eski narx chiziq ostida)
 *    - Stok holati (In Stock / Out of Stock)
 *    - Miqdor tanlash (- 1 +)
 *    - "Add to Cart" + "Wishlist" tugmalari
 *    - Mahsulot meta: SKU, Kategoriya, Teglar
 *
 * PASTKI QISM:
 * 4. ProductTabs      - Description | Additional Info | Vendor | Reviews (5)
 *    - Description tab: Mahsulot tavsifi matni
 *    - Packaging & Delivery qismi
 *    - Suggested Use
 *    - Warnings
 * 5. RelatedProducts  - O'xshash mahsulotlar slider (4 ta ko'rinadi)
 *
 * O'NG SIDEBAR:
 * - Kategoriya ro'yxati
 * - Fill by price
 * - New Products
 *
 * QILISH KERAK BO'LGAN ISHLAR:
 *
 * 1. URL dan ID oling:
 *    const { id } = useParams();
 *
 * 2. API dan mahsulotni oling:
 *    import { getProductById } from "../../services/api";
 *    const { data: product, loading } = useFetch(getProductById, id);
 *
 * 3. Miqdor boshqarish:
 *    const [qty, setQty] = useState(1);
 *    const increase = () => setQty(q => q + 1);
 *    const decrease = () => setQty(q => Math.max(1, q - 1));
 *
 * 4. Rasm gallereyasi:
 *    const [activeImage, setActiveImage] = useState(0);
 *    - product.images massivini map qiling
 *    - Kichik rasmga bosganda katta rasm o'zgaradi
 *
 * 5. Savatchaga qo'shish:
 *    import { useCart } from "../../context/CartContext";
 *    const { addToCart } = useCart();
 *    const handleAddToCart = () => {
 *      addToCart(product, qty);
 *      toast.success("Savatchaga qo'shildi!");
 *    };
 *
 * 6. Tabs boshqarish:
 *    const [activeTab, setActiveTab] = useState("description");
 *    - "description" | "additional" | "vendor" | "reviews"
 *
 * 7. O'xshash mahsulotlar:
 *    import { getProducts } from "../../services/api";
 *    - category filtr bilan, limit=4
 *
 * MAHSULOT MA'LUMOT TUZILMASI:
 * {
 *   _id: "...",
 *   name: "Seeds of Change Organic Quinoa",
 *   images: ["rasm1.jpg", "rasm2.jpg"],
 *   price: 38.00,
 *   oldPrice: 52.00,
 *   rating: 4,
 *   sold: 120,
 *   inStock: true,
 *   badge: "NEW",
 *   category: { name: "Vegetables", _id: "..." },
 *   sku: "FWM15VKT",
 *   description: "...",
 *   tags: ["Organic", "Quinoa"]
 * }
 *
 * DIQQAT: Faqat shu sahifa va src/components/product/ papkasidagi
 * komponentlarni o'zgartiring!
 */

import { useState } from "react";
import { useParams } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiStar, FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import Breadcrumb from "../../components/shared/Breadcrumb";
// import { useCart } from "../../context/CartContext";
// import { getProductById, getProducts } from "../../services/api";
// import useFetch from "../../hooks/useFetch";

// Tabs ro'yxati
const PRODUCT_TABS = [
  { id: "description", label: "Description" },
  { id: "additional", label: "Additional Info" },
  { id: "vendor", label: "Vendor" },
  { id: "reviews", label: "Reviews (5)" },
];

const ProductDetail = () => {
  const { id } = useParams();

  // TODO: API dan mahsulotni oling
  // const { data: product, loading } = useFetch(getProductById, id);

  // Miqdor holati
  const [qty, setQty] = useState(1);
  // Faol tab
  const [activeTab, setActiveTab] = useState("description");
  // Faol rasm indeksi
  const [activeImg, setActiveImg] = useState(0);

  // Miqdorni oshirish
  const increaseQty = () => setQty((q) => q + 1);
  // Miqdorni kamaytirish (minimum 1)
  const decreaseQty = () => setQty((q) => Math.max(1, q - 1));

  // Savatchaga qo'shish
  const handleAddToCart = () => {
    // TODO: useCart() dan addToCart ishlating
    toast.success(`${qty} ta mahsulot savatchaga qo'shildi!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Shop", path: "/shop" },
          { label: "Vegetables", path: "/shop?category=vegetables" },
          { label: "Mahsulot nomi" }, // TODO: product.name
        ]}
      />

      {/* ===== MAHSULOT BOSH QISMI ===== */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* 1. RASM GALLEREYASI - Chap */}
        <div className="flex-1">
          {/* Katta rasm */}
          <div className="bg-gray-50 h-80 rounded-lg flex items-center justify-center text-gray-500 mb-3">
            Katta mahsulot rasmi (Aziza)
          </div>
          {/* Kichik rasmlar */}
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-16 bg-gray-100 rounded border-2 transition-colors ${
                  activeImg === i ? "border-green-500" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 2. MAHSULOT MA'LUMOTLARI - O'ng */}
        <div className="flex-1">
          {/* Kategoriya */}
          <span className="text-green-600 text-sm font-medium">Vegetables</span>

          {/* Sarlavha */}
          <h1 className="text-2xl font-bold text-gray-800 mt-1 mb-2">
            {/* TODO: product.name */}
            Seeds of Change Organic Quinoa, Brown (Aziza)
          </h1>

          {/* Reyting */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <FiStar
                  key={s}
                  size={16}
                  className={s <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">(120 ta sotilgan)</span>
          </div>

          {/* Narx */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-green-600">$38.00</span>
            <span className="text-lg text-gray-400 line-through">$52.00</span>
          </div>

          {/* Stok holati */}
          <p className="text-sm text-gray-600 mb-4">
            Holat:{" "}
            <span className="text-green-600 font-medium">Stokda bor</span>
          </p>

          {/* Qisqacha tavsif */}
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {/* TODO: product.description dan birinchi 2 jumlani oling */}
            Mahsulot qisqacha tavsifi bu yerda ko'rinadi...
          </p>

          {/* Miqdor tanlash + Savatchaga qo'shish */}
          <div className="flex items-center gap-3 mb-4">
            {/* Miqdor */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={decreaseQty}
                className="px-3 py-2 hover:bg-gray-50 text-gray-600"
              >
                <FiMinus size={14} />
              </button>
              <span className="px-4 py-2 text-sm font-medium w-12 text-center">
                {qty}
              </span>
              <button
                onClick={increaseQty}
                className="px-3 py-2 hover:bg-gray-50 text-gray-600"
              >
                <FiPlus size={14} />
              </button>
            </div>

            {/* Savatchaga qo'shish */}
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-medium transition-colors"
            >
              <FiShoppingCart size={18} />
              Add to Cart
            </button>

            {/* Sevimlillar */}
            <button className="p-2.5 border border-gray-200 rounded-lg hover:border-green-500 hover:text-green-600 transition-colors">
              <FiHeart size={18} />
            </button>
          </div>

          {/* Meta ma'lumotlar */}
          <div className="space-y-1 text-sm text-gray-500 border-t border-gray-100 pt-4">
            <p>
              <span className="font-medium text-gray-700">SKU:</span> FWM15VKT
            </p>
            <p>
              <span className="font-medium text-gray-700">Kategoriya:</span>{" "}
              Vegetables
            </p>
            <p>
              <span className="font-medium text-gray-700">Teglar:</span>{" "}
              Organic, Quinoa, Healthy
            </p>
          </div>
        </div>

        {/* 3. SIDEBAR - O'ng */}
        <div className="w-full lg:w-56 flex-shrink-0">
          <div className="bg-gray-50 h-80 flex flex-col items-center justify-center text-gray-500 rounded-lg border-2 border-dashed text-sm">
            <p>Sidebar (Aziza):</p>
            <p className="text-xs mt-2">- Kategoriyalar</p>
            <p className="text-xs">- Narx filtri</p>
            <p className="text-xs">- New Products</p>
          </div>
        </div>
      </div>

      {/* ===== TABS ===== */}
      <div className="mb-8">
        {/* Tab sarlavhalari */}
        <div className="flex border-b border-gray-200 mb-4">
          {PRODUCT_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab kontenti */}
        <div className="bg-gray-50 min-h-32 p-4 rounded-lg border-2 border-dashed border-gray-200 text-gray-500 text-sm">
          {activeTab === "description" && (
            <p>Mahsulot batafsil tavsifi bu yerda (Aziza)</p>
          )}
          {activeTab === "additional" && (
            <p>Qo'shimcha ma'lumotlar: og'irlik, o'lcham (Aziza)</p>
          )}
          {activeTab === "vendor" && <p>Sotuvchi ma'lumotlari (Aziza)</p>}
          {activeTab === "reviews" && <p>Foydalanuvchi izohlari (Aziza)</p>}
        </div>
      </div>

      {/* ===== O'XSHASH MAHSULOTLAR ===== */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Related Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="bg-gray-50 h-48 flex items-center justify-center text-gray-400 text-xs rounded-lg border-2 border-dashed"
              >
                O'xshash mahsulot #{i + 1} (Aziza)
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
