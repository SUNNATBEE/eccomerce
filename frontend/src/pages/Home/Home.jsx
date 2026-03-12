/**
 * Home.jsx - Bosh sahifa
 * ====================================================
 * VAZIFA: FIRDAVS
 * ====================================================
 *
 * Figma UI ga qarab Home sahifasi quyidagi bo'limlardan iborat:
 *
 * 1. HeroSlider        - Katta banner (Fresh Vegetables Big discount)
 * 2. PopularProducts   - Eng mashhur mahsulotlar + kategoriya filtr
 * 3. BannerRow         - 3 ta reklama bannerlari
 * 4. DealsOfDay        - Kunning takliflari (countdown timer bilan)
 * 5. ShopByCategory    - Kategoriya bo'yicha qidirish
 * 6. TabProducts       - Top Selling | Trending | Recently Added | Top Rated
 *
 * QILISH KERAK BO'LGAN ISHLAR:
 * 1. HeroSlider komponentini yarating (src/components/home/HeroSlider.jsx)
 *    - Swiper kutubxonasidan foydalaning
 *    - Chap: matn, o'ng: rasm
 *    - "Subscribe" email input bor
 *
 * 2. PopularProducts komponentini yarating (src/components/home/PopularProducts.jsx)
 *    - API dan mahsulotlarni oling: getProducts() - services/api.js
 *    - Kategoriya tablar: Baking | Herbal | Wine&Drink | Vegetable
 *    - Chap: kategoriyalar ro'yxati, O'ng: mahsulot gridlar
 *    - ProductCard komponentini ishlating (src/components/shared/ProductCard.jsx)
 *
 * 3. DealsOfDay komponentini yarating (src/components/home/DealsOfDay.jsx)
 *    - Vaqt sanash (countdown): 02:45:23 kabi
 *    - Gorizontal scroll mahsulotlar
 *    - "All Deals" link → /shop sahifasiga
 *
 * 4. ShopByCategory komponentini yarating (src/components/home/ShopByCategory.jsx)
 *    - API dan kategoriyalarni oling: getCategories() - services/api.js
 *    - Har bir kategoriya: rasm + nom + mahsulotlar soni
 *    - Link → /shop?category=... sahifasiga
 *
 * 5. TabProducts komponentini yarating (src/components/home/TabProducts.jsx)
 *    - 4 ta tab: Top Selling | Trending | Recently Added | Top Rated
 *    - Tab o'zgarganda tegishli mahsulotlar ko'rinadi
 *
 * API ISHLATISH NAMUNASI:
 * import { getProducts } from "../../services/api";
 * import useFetch from "../../hooks/useFetch";
 * const { data, loading, error } = useFetch(getProducts, { limit: 8 });
 *
 * DIQQAT: Faqat shu sahifa va src/components/home/ papkasidagi
 * komponentlarni o'zgartiring!
 */

// Komponentlarni import qilish (siz yaratasiz!)
import BannerRow from "../../components/home/BannerRow.jsx";
import DealsOfDay from "../../components/home/DealsOfDay.jsx";
import HeroSlider from "../../components/home/HeroSlider";
import PopularProducts from "../../components/home/PopularProducts.jsx";
import ShopByCategory from "../../components/home/ShopByCategory.jsx";
// import BannerRow from "../../components/home/BannerRow";
// import DealsOfDay from "../../components/home/DealsOfDay";
// import ShopByCategory from "../../components/home/ShopByCategory";
// import TabProducts from "../../components/home/TabProducts";

const Home = () => {
  return (
    <div>
      {/* ===== 1. HERO SLIDER ===== */}
      {/* <HeroSlider /> */}
      {/* TODO: HeroSlider komponentini yaratib import qiling */}
      <div className="">
        {/* 🛒 HeroSlider - Bu yerga Swiper slider qo'ying (Firdavs) */}
        <HeroSlider/>
      </div>

      <div className="">
        {/* ===== 2. POPULAR PRODUCTS ===== */}
        {/* <PopularProducts /> */}
        {/* <div className="my-8 bg-gray-50 h-32 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed"> */}
          {/* Popular Products bo'limi (Firdavs) */}
          <PopularProducts/>
        {/* </div> */}

        {/* ===== 3. BANNER ROW ===== */}
        {/* <BannerRow /> */}
        <div className="">
          {/* Banner Row (Firdavs) */}
          <DealsOfDay/>
        </div>

        {/* ===== 4. DEALS OF THE DAY ===== */}
        {/* <DealsOfDay /> */}
        <div className="">
          {/* Deals of the Day (Firdavs) */}
          <BannerRow/>
        </div>

        {/* ===== 5. SHOP BY CATEGORY ===== */}
        {/* <ShopByCategory /> */}
        <div className="">
          {/* Shop By Category (Firdavs) */}
          <ShopByCategory/>
        </div>

      </div>
    </div>
  );
};

export default Home;
