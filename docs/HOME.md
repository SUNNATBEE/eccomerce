# 🏠 Home Page - Firdavs

## Sen kim uchun ishlaysan?
**Firdavs** - Bosh sahifa (Home Page)

---

## 📍 Sening fayllaringiz

```
src/pages/Home/Home.jsx              ← Asosiy sahifa fayli
src/components/home/
  ├── HeroSlider.jsx                 ← Yaratishing kerak
  ├── PopularProducts.jsx            ← Yaratishing kerak
  ├── BannerRow.jsx                  ← Yaratishing kerak
  ├── DealsOfDay.jsx                 ← Yaratishing kerak
  ├── ShopByCategory.jsx             ← Yaratishing kerak
  └── TabProducts.jsx                ← Yaratishing kerak
```

---

## 🎨 Figma bo'limlari va vazifalar

### 1. HeroSlider (Asosiy banner)
**Ko'rinishi:** Katta yashil background, chap: matn, o'ng: sabzavot rasmi

```jsx
// Swiper kutubxonasidan foydalanish:
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const HeroSlider = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      className="h-80 bg-green-50"
    >
      <SwiperSlide>
        <div className="flex items-center justify-between px-16 h-full">
          {/* Chap: Matn */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Fresh Vegetables<br/>Big discount
            </h1>
            <p className="text-gray-500 mt-2">Sign up for the daily newsletter</p>
            {/* Email input */}
            <div className="flex mt-4">
              <input placeholder="Your email..." className="border px-4 py-2 rounded-l" />
              <button className="bg-green-500 text-white px-4 py-2 rounded-r">Subscribe</button>
            </div>
          </div>
          {/* O'ng: Rasm */}
          <img src="/hero-vegetables.png" alt="Vegetables" className="h-64" />
        </div>
      </SwiperSlide>
      {/* Yana 2-3 ta slide qo'shish mumkin */}
    </Swiper>
  );
};
```

### 2. PopularProducts (Mashhur mahsulotlar)
**Ko'rinishi:** Chap - kategoriya ro'yxati, O'ng - mahsulot grid

```jsx
import { useState } from "react";
import { getProducts } from "../../services/api";
import useFetch from "../../hooks/useFetch";
import ProductCard from "../shared/ProductCard";

const CATEGORIES = ["All", "Baking", "Herbal", "Wine & Drinks", "Vegetable"];

const PopularProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // API dan mahsulotlarni olish
  const { data, loading } = useFetch(getProducts, {
    category: activeCategory === "All" ? "" : activeCategory,
    limit: 10
  });

  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Popular Products</h2>
        {/* Kategoriya tablar */}
        <div className="flex gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-sm rounded ${
                activeCategory === cat ? "bg-green-500 text-white" : "text-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mahsulotlar grid */}
      {loading ? (
        <div>Yuklanmoqda...</div>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {data?.products?.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
```

### 3. DealsOfDay (Kunning takliflari)
**Ko'rinishi:** Sarlavha + Countdown timer + Mahsulotlar (gorizontal scroll)

```jsx
import { useState, useEffect } from "react";

const DealsOfDay = () => {
  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 23 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Deals Of The Day</h2>
        {/* Countdown */}
        <div className="flex gap-2 text-sm">
          <span className="bg-gray-800 text-white px-2 py-1 rounded">
            {String(timeLeft.hours).padStart(2, "0")}h
          </span>
          <span className="bg-gray-800 text-white px-2 py-1 rounded">
            {String(timeLeft.minutes).padStart(2, "0")}m
          </span>
          <span className="bg-gray-800 text-white px-2 py-1 rounded">
            {String(timeLeft.seconds).padStart(2, "0")}s
          </span>
        </div>
      </div>
      {/* Mahsulotlar */}
    </section>
  );
};
```

### 4. ShopByCategory (Kategoriya bo'yicha)
**Ko'rinishi:** Dumaloq ikonlar bilan kategoriyalar

```jsx
import { getCategories } from "../../services/api";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const ShopByCategory = () => {
  const { data: categories, loading } = useFetch(getCategories);

  return (
    <section className="my-8">
      <h2 className="text-xl font-bold mb-4">Shop by Categories</h2>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {categories?.map(cat => (
          <Link key={cat._id} to={`/shop?category=${cat.slug}`} className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-2">
              <img src={cat.icon} alt={cat.name} className="w-8 h-8" />
            </div>
            <p className="text-xs text-gray-600">{cat.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
```

---

## 🔧 API funksiyalari

```javascript
import { getProducts, getCategories, getDealProducts } from "../../services/api";
import useFetch from "../../hooks/useFetch";

// Mashhur mahsulotlar
const { data } = useFetch(getProducts, { sort: "popular", limit: 10 });

// Kategoriyalar
const { data: categories } = useFetch(getCategories);

// Deal mahsulotlar
const { data: deals } = useFetch(getDealProducts);
```

---

## ✅ Tekshirish ro'yxati

- [ ] HeroSlider - Swiper bilan ishlaydi
- [ ] Slider avtomatik almashinadi
- [ ] PopularProducts - API dan ma'lumot keladi
- [ ] Kategoriya filter ishlaydi
- [ ] DealsOfDay - countdown timer ishlaydi
- [ ] ShopByCategory - kategoriyalar ko'rinadi
- [ ] TabProducts - 4 ta tab ishlaydi
- [ ] Mobil ko'rinish (responsive) ishlaydi
- [ ] Loading holati ko'rsatiladi

---

## ⚠️ Muhim eslatmalar

1. Faqat `src/pages/Home/` va `src/components/home/` papkalarini o'zgartiring
2. Header va Footer ni O'ZGARTIRMANG (ular umumiy)
3. `ProductCard` komponentini qaytadan yaratmang, tayyor komponentni ishlating
4. Har bir commit da nima qilganingizni yozing:
   ```bash
   git commit -m "feat: HeroSlider Swiper bilan qo'shildi"
   ```
