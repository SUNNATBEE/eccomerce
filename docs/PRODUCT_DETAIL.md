# 🛍️ Single Product View - Aziza

## Sen kim uchun ishlaysan?
**Aziza** - Bitta mahsulot batafsil sahifasi (Single Product View)

---

## 📍 Sening fayllaringiz

```
src/pages/ProductDetail/ProductDetail.jsx  ← Asosiy sahifa fayli (tayyor, to'ldirish kerak)
src/components/product/
  ├── ProductGallery.jsx             ← Yaratishing kerak
  ├── ProductInfo.jsx                ← Yaratishing kerak
  ├── ProductTabs.jsx                ← Yaratishing kerak
  └── RelatedProducts.jsx           ← Yaratishing kerak
```

---

## 🎨 Figma bo'limlari va vazifalar

### 1. ProductGallery (Rasm gallereyasi)

```jsx
import { useState } from "react";

const ProductGallery = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Agar images bo'sh bo'lsa placeholder
  const displayImages = images.length > 0 ? images : ["/placeholder-product.jpg"];

  return (
    <div>
      {/* Katta rasm */}
      <div className="bg-gray-50 rounded-lg p-6 mb-3 flex items-center justify-center h-80">
        <img
          src={displayImages[activeIndex]}
          alt="Mahsulot"
          className="max-h-full object-contain"
        />
      </div>

      {/* Kichik rasmlar (thumbnails) */}
      <div className="flex gap-2">
        {displayImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
              activeIndex === i ? "border-green-500" : "border-gray-200"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
```

### 2. ProductInfo (Mahsulot ma'lumotlari)

```jsx
import { useState } from "react";
import { FiHeart, FiShoppingCart, FiMinus, FiPlus, FiStar } from "react-icons/fi";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";

const ProductInfo = ({ product }) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  // Miqdor
  const increaseQty = () => setQty(q => q + 1);
  const decreaseQty = () => setQty(q => Math.max(1, q - 1));

  // Savatchaga qo'shish
  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${qty} ta "${product.name}" savatchaga qo'shildi!`);
  };

  // Chegirma foizi
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div>
      {/* Badge va kategoriya */}
      <div className="flex gap-2 mb-2">
        {product.badge && (
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            {product.badge}
          </span>
        )}
        <span className="text-green-600 text-sm">{product.category?.name}</span>
      </div>

      {/* Sarlavha */}
      <h1 className="text-2xl font-bold text-gray-800 mb-3">{product.name}</h1>

      {/* Reyting */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex">
          {[1,2,3,4,5].map(s => (
            <FiStar key={s} size={16}
              className={s <= product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
          ))}
        </div>
        <span className="text-sm text-gray-500">
          {product.rating}/5 ({product.sold} ta baholagan)
        </span>
      </div>

      {/* Narx */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl font-bold text-green-600">
          ${product.price?.toFixed(2)}
        </span>
        {product.oldPrice && (
          <span className="text-lg text-gray-400 line-through">
            ${product.oldPrice?.toFixed(2)}
          </span>
        )}
        {discount > 0 && (
          <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded">
            -{discount}% CHEGIRMA
          </span>
        )}
      </div>

      {/* Stok holati */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-600">Stok holati:</span>
        <span className={`text-sm font-medium ${product.inStock ? "text-green-600" : "text-red-500"}`}>
          {product.inStock ? "✓ Mavjud" : "✗ Tugagan"}
        </span>
      </div>

      {/* Qisqacha tavsif */}
      <p className="text-sm text-gray-600 leading-relaxed mb-5">
        {product.description?.slice(0, 150)}...
      </p>

      {/* Miqdor + Savatcha */}
      <div className="flex items-center gap-3 mb-5">
        {/* Miqdor */}
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button onClick={decreaseQty}
            className="px-3 py-2.5 hover:bg-gray-50 text-gray-600 disabled:opacity-40"
            disabled={qty <= 1}>
            <FiMinus size={14} />
          </button>
          <span className="px-4 py-2 font-medium w-12 text-center">{qty}</span>
          <button onClick={increaseQty} className="px-3 py-2.5 hover:bg-gray-50 text-gray-600">
            <FiPlus size={14} />
          </button>
        </div>

        {/* Add to Cart */}
        <button onClick={handleAddToCart} disabled={!product.inStock}
          className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600
                     disabled:bg-gray-300 text-white py-2.5 rounded-lg font-medium transition-colors">
          <FiShoppingCart size={18} />
          Savatchaga qo'shish
        </button>

        {/* Wishlist */}
        <button className="p-2.5 border border-gray-200 rounded-lg hover:border-red-400 hover:text-red-500 transition-colors">
          <FiHeart size={18} />
        </button>
      </div>

      {/* Meta ma'lumotlar */}
      <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
        {product.sku && (
          <div><span className="text-gray-500">SKU:</span> <span className="text-gray-700">{product.sku}</span></div>
        )}
        {product.category && (
          <div><span className="text-gray-500">Kategoriya:</span> <span className="text-green-600">{product.category.name}</span></div>
        )}
        {product.tags?.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            <span className="text-gray-500">Teglar:</span>
            {product.tags.map(tag => (
              <span key={tag} className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
```

### 3. ProductTabs (Tabs)

```jsx
const TABS = [
  { id: "description", label: "Tavsif" },
  { id: "additional", label: "Qo'shimcha ma'lumot" },
  { id: "vendor", label: "Sotuvchi" },
  { id: "reviews", label: "Baholashlar" },
];

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="my-8">
      {/* Tab sarlavhalari */}
      <div className="flex border-b border-gray-200">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab kontenti */}
      <div className="py-6">
        {activeTab === "description" && (
          <div className="text-gray-700 text-sm leading-relaxed space-y-3">
            <p>{product.description}</p>
            {product.packaging && (
              <>
                <h4 className="font-semibold text-gray-800">Qadoqlash va yetkazish</h4>
                <p>{product.packaging}</p>
              </>
            )}
            {product.warnings && (
              <>
                <h4 className="font-semibold text-gray-800">Ogohlantirishlar</h4>
                <p className="text-orange-600">{product.warnings}</p>
              </>
            )}
          </div>
        )}
        {activeTab === "additional" && (
          <table className="text-sm text-gray-700 w-full">
            <tbody>
              {product.weight && <tr className="border-b"><td className="py-2 font-medium w-32">Og'irlik</td><td>{product.weight}</td></tr>}
              {product.dimensions && <tr className="border-b"><td className="py-2 font-medium">O'lchamlar</td><td>{product.dimensions}</td></tr>}
              {product.origin && <tr><td className="py-2 font-medium">Kelib chiqishi</td><td>{product.origin}</td></tr>}
            </tbody>
          </table>
        )}
        {activeTab === "vendor" && (
          <p className="text-gray-600 text-sm">Sotuvchi ma'lumotlari</p>
        )}
        {activeTab === "reviews" && (
          <p className="text-gray-600 text-sm">Foydalanuvchi baholashlari</p>
        )}
      </div>
    </div>
  );
};
```

### 4. ProductDetail.jsx da hammani birlashtirish

```jsx
import { useParams } from "react-router-dom";
import { getProductById, getProducts } from "../../services/api";
import useFetch from "../../hooks/useFetch";
import Breadcrumb from "../../components/shared/Breadcrumb";
import ProductGallery from "../../components/product/ProductGallery";
import ProductInfo from "../../components/product/ProductInfo";
import ProductTabs from "../../components/product/ProductTabs";
import ProductCard from "../../components/shared/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, loading } = useFetch(getProductById, id);
  const { data: relatedData } = useFetch(getProducts, {
    category: product?.category?._id,
    limit: 4
  });

  if (loading) return <div className="animate-pulse p-8">Yuklanmoqda...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[
        { label: "Shop", path: "/shop" },
        { label: product?.category?.name, path: `/shop?category=${product?.category?._id}` },
        { label: product?.name }
      ]} />

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="flex-1">
          <ProductGallery images={product?.images} />
        </div>
        <div className="flex-1">
          <ProductInfo product={product} />
        </div>
      </div>

      <ProductTabs product={product} />

      {/* O'xshash mahsulotlar */}
      <h2 className="text-xl font-bold mb-4">O'xshash mahsulotlar</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedData?.products?.slice(0, 4).map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};
```

---

## ✅ Tekshirish ro'yxati

- [ ] URL dan ID olindi
- [ ] API dan mahsulot ma'lumotlari keladi
- [ ] Rasm gallereyasi - kichik rasmga bosganda katta rasm o'zgaradi
- [ ] Narx va chegirma ko'rinadi
- [ ] Miqdor +/- ishlaydi
- [ ] "Savatchaga qo'shish" ishlaydi va toast ko'rinadi
- [ ] 4 ta tab ishlaydi
- [ ] O'xshash mahsulotlar ko'rinadi
- [ ] Loading skeleton ko'rinadi
- [ ] Mobil responsive ishlaydi

---

## ⚠️ Muhim eslatmalar

1. `useCart()` - `context/CartContext.jsx` dan import qiling
2. `getProductById(id)` - `services/api.js` da tayyor
3. Miqdor minimum 1 dan kam bo'lmasin (`Math.max(1, qty - 1)`)
4. `product.inStock` false bo'lsa "Savatchaga qo'shish" disabled qiling
