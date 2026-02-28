# 🏪 Shop Page - Abduvoris

## Sen kim uchun ishlaysan?
**Abduvoris** - Do'kon sahifasi (Shop Page)

---

## 📍 Sening fayllaringiz

```
src/pages/Shop/Shop.jsx              ← Asosiy sahifa fayli (tayyor, to'ldirish kerak)
src/components/shop/
  ├── ShopSidebar.jsx                ← Yaratishing kerak
  ├── ShopFilterBar.jsx              ← Yaratishing kerak
  └── ProductListCard.jsx           ← Yaratishing kerak (list ko'rinish)
```

---

## 🎨 Figma bo'limlari va vazifalar

### 1. ShopSidebar (Filter sidebar)

```jsx
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const CATEGORIES = [
  { name: "All Fresh Items", count: 150 },
  { name: "Celery", count: 14 },
  { name: "Canned foods", count: 9 },
  { name: "Clothing", count: 21 },
  { name: "Cup & Plate", count: 5 },
  { name: "Fresh Seafood", count: 12 },
  { name: "Vegetables", count: 45 },
];

const ShopSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const activeCategory = searchParams.get("category") || "";

  // Kategoriya o'zgarganda URL yangilash
  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category) params.set("category", category);
    else params.delete("category");
    params.set("page", "1");
    setSearchParams(params);
  };

  return (
    <div className="space-y-5 w-full">
      {/* Kategoriyalar */}
      <div className="bg-white border border-gray-100 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Kategoriyalar</h3>
        <ul className="space-y-1.5">
          {CATEGORIES.map(cat => (
            <li key={cat.name}>
              <button
                onClick={() => handleCategoryChange(cat.name === "All Fresh Items" ? "" : cat.name)}
                className={`w-full flex justify-between items-center text-sm py-1 px-2 rounded transition-colors ${
                  (cat.name === "All Fresh Items" && !activeCategory) ||
                  activeCategory === cat.name
                    ? "text-green-600 font-medium bg-green-50"
                    : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-xs text-gray-400">({cat.count})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Narx filtri */}
      <div className="bg-white border border-gray-100 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Narx bo'yicha filter</h3>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={1000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-green-500"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("minPrice", priceRange[0]);
              params.set("maxPrice", priceRange[1]);
              setSearchParams(params);
            }}
            className="w-full bg-green-500 text-white py-1.5 rounded text-sm hover:bg-green-600 transition-colors"
          >
            Filtrlash
          </button>
        </div>
      </div>

      {/* New Products */}
      <div className="bg-white border border-gray-100 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Yangi mahsulotlar</h3>
        {/* TODO: API dan yangi mahsulotlar oling */}
        <div className="space-y-2">
          {/* getProducts({ sort: "newest", limit: 4 }) */}
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
```

### 2. ShopFilterBar (Yuqori filter qismi)

```jsx
import { useSearchParams } from "react-router-dom";
import { FiGrid, FiList } from "react-icons/fi";

const ShopFilterBar = ({ total, viewMode, onViewModeChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLimitChange = (limit) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", limit);
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleSortChange = (sort) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    params.set("page", "1");
    setSearchParams(params);
  };

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 mb-4">
      {/* Chap: Natija soni */}
      <span className="text-sm text-gray-500">
        <span className="font-medium text-gray-800">{total || 0}</span> ta mahsulot topildi
      </span>

      {/* O'ng: Sort va View */}
      <div className="flex items-center gap-3">
        {/* Ko'rsatish soni */}
        <div className="flex items-center gap-1 text-sm">
          <span className="text-gray-500 hidden sm:block">Ko'rsatish:</span>
          {[9, 18, 36].map(n => (
            <button key={n}
              onClick={() => handleLimitChange(n)}
              className={`w-7 h-7 rounded text-xs transition-colors ${
                Number(searchParams.get("limit")) === n
                  ? "bg-green-500 text-white"
                  : "border border-gray-200 hover:border-green-500 text-gray-600"
              }`}>
              {n}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={searchParams.get("sort") || ""}
          onChange={e => handleSortChange(e.target.value)}
          className="text-sm border border-gray-200 rounded px-2 py-1.5 outline-none focus:border-green-500"
        >
          <option value="">Standart</option>
          <option value="price_asc">Narx: past → yuqori</option>
          <option value="price_desc">Narx: yuqori → past</option>
          <option value="newest">Yangi</option>
          <option value="popular">Mashhur</option>
        </select>

        {/* View toggle */}
        <div className="flex gap-1">
          <button onClick={() => onViewModeChange("grid")}
            className={`p-1.5 rounded transition-colors ${
              viewMode === "grid" ? "bg-green-500 text-white" : "text-gray-400 border border-gray-200"
            }`}>
            <FiGrid size={16} />
          </button>
          <button onClick={() => onViewModeChange("list")}
            className={`p-1.5 rounded transition-colors ${
              viewMode === "list" ? "bg-green-500 text-white" : "text-gray-400 border border-gray-200"
            }`}>
            <FiList size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
```

### 3. ProductListCard (List ko'rinish)
Figma da "List Right/Left Sidebar" ko'rinishi:

```jsx
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";

const ProductListCard = ({ product }) => {
  return (
    <div className="flex gap-4 bg-white border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
      {/* Rasm */}
      <Link to={`/product/${product._id}`}
        className="w-32 h-32 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
      </Link>

      {/* Matn */}
      <div className="flex-1 min-w-0">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-medium text-gray-800 hover:text-green-600 transition-colors mb-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map(s => (
            <FiStar key={s} size={12}
              className={s <= product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
          ))}
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-green-600">${product.price?.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">${product.oldPrice?.toFixed(2)}</span>
            )}
          </div>
          <div className="flex gap-2">
            <button className="p-1.5 border border-gray-200 rounded hover:border-green-500 hover:text-green-600 transition-colors">
              <FiHeart size={14} />
            </button>
            <button className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm transition-colors">
              <FiShoppingCart size={14} />
              Qo'shish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### 4. Shop.jsx da API ishlatish

```jsx
import { getProducts } from "../../services/api";
import useFetch from "../../hooks/useFetch";

// URL parametrlar asosida mahsulotlar olish:
const { data, loading } = useFetch(getProducts, {
  page: currentPage,
  limit: Number(searchParams.get("limit")) || 12,
  category: searchParams.get("category") || "",
  sort: searchParams.get("sort") || "",
  minPrice: searchParams.get("minPrice") || 0,
  maxPrice: searchParams.get("maxPrice") || 10000,
});

// Ma'lumotlar:
// data.products - mahsulotlar massivi
// data.total    - jami mahsulotlar soni
// data.totalPages - jami sahifalar soni
```

---

## ✅ Tekshirish ro'yxati

- [ ] Grid va List ko'rinish almashinadi
- [ ] Sidebar kategoriya filter ishlaydi
- [ ] Narx filtri ishlaydi
- [ ] Sort (saralash) ishlaydi
- [ ] API dan mahsulotlar keladi
- [ ] Pagination ishlaydi
- [ ] URL query parametrlar o'zgaradi
- [ ] Loading holati ko'rinadi
- [ ] Mobil da sidebar yashiriladi
- [ ] "Show 9/18/36" ishlaydi

---

## ⚠️ Muhim eslatmalar

1. URL query parametrlarni ishlating - bu sahifani bo'lishish imkonini beradi
2. Grid ko'rinish uchun `ProductCard` komponentini ishlating (tayyor)
3. List ko'rinish uchun yangi `ProductListCard` yarating
4. Filter o'zgarganda `page = 1` ga qaytsin
5. `useSearchParams()` - URL parametrlarini boshqarish uchun
