/**
 * Blog.jsx - Blog & Yangiliklar sahifasi
 * ====================================================
 * VAZIFA: ABDUVOHID
 * ====================================================
 *
 * Figma UI ga qarab Blog sahifasi quyidagi bo'limlardan iborat:
 *
 * 1. PageBanner   - "Blog & News" sarlavha + kategoriya tablar
 *    - Tablar: Shopping | Recipe | Kitchen | Home | Food
 * 2. BlogGrid     - Asosiy blog postlar (3 ustunli grid)
 * 3. Sidebar      - O'ng tomon:
 *    - Categoriya ro'yxati (soni bilan)
 *    - Trending Now (rasm + sarlavha + narx)
 *    - Gallery (kichik rasmlar seti)
 *    - Popular Tags
 * 4. Pagination   - Sahifalar almashtirish
 *
 * QILISH KERAK BO'LGAN ISHLAR:
 *
 * 1. BlogCard komponentini yarating (src/components/blog/BlogCard.jsx):
 *    - Rasm (to'liq kenglikda)
 *    - Kategoriya badge (masalan: "Recipe")
 *    - Blog sarlavhasi
 *    - Muallif, sana, izohlar soni
 *    - Link → /blog/:id sahifasiga
 *
 * 2. BlogSidebar komponentini yarating (src/components/blog/BlogSidebar.jsx):
 *    - Kategoriya ro'yxati (soni bilan)
 *    - Trending Now bo'limi
 *    - Gallery rasmlar (kichik grid)
 *    - Popular Tags (badge ko'rinishida)
 *
 * 3. API dan bloglarni oling:
 *    import { getBlogs } from "../../services/api";
 *    import useFetch from "../../hooks/useFetch";
 *    const { data, loading, error } = useFetch(getBlogs, { page: 1 });
 *
 * 4. Kategoriya filter:
 *    - Tab bosilganda: getBlogs({ category: "recipe" })
 *    - useState bilan activeTab boshqariladi
 *
 * 5. Pagination:
 *    import Pagination from "../../components/shared/Pagination";
 *    <Pagination
 *      currentPage={page}
 *      totalPages={data?.totalPages}
 *      onPageChange={(p) => setPage(p)}
 *    />
 *
 * BLOG MA'LUMOT TUZILMASI (API dan keladigan):
 * {
 *   _id: "...",
 *   title: "Blog sarlavhasi",
 *   excerpt: "Qisqacha tavsif...",
 *   image: "rasm-url",
 *   category: "Recipe",
 *   author: { name: "Muallif", avatar: "..." },
 *   createdAt: "2024-01-01",
 *   commentsCount: 5
 * }
 *
 * DIQQAT: Faqat shu sahifa va src/components/blog/ papkasidagi
 * komponentlarni o'zgartiring!
 */

import { useState } from "react";
import Breadcrumb from "../../components/shared/Breadcrumb";
import Pagination from "../../components/shared/Pagination";

// Blog kategoriya tablari
const BLOG_TABS = ["All", "Shopping", "Recipe", "Kitchen", "Home", "Food"];

const Blog = () => {
  // Faol tab holati
  const [activeTab, setActiveTab] = useState("All");
  // Hozirgi sahifa
  const [currentPage, setCurrentPage] = useState(1);

  // TODO: API dan blog ma'lumotlarini oling
  // const { data, loading } = useFetch(getBlogs, { page: currentPage, category: activeTab });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Blog" }]} />

      {/* ===== PAGE BANNER ===== */}
      <div className="bg-green-50 rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Blog & News</h1>
        {/* Kategoriya tablar */}
        <div className="flex gap-2 flex-wrap">
          {BLOG_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1); // Tab o'zgarganda 1-sahifadan boshlash
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ===== ASOSIY KONTENT + SIDEBAR ===== */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Blog postlar grid - Chap tomon (2/3) */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            📰 Recipes Articles
          </h2>

          {/* Blog kartochkalar grid */}
          {/* <BlogGrid blogs={data?.blogs} loading={loading} /> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* TODO: BlogCard komponentini yarating va shu yerda mapping qiling */}
            {Array(9)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-50 h-48 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed text-sm"
                >
                  BlogCard #{i + 1} (Abduvohid)
                </div>
              ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* SIDEBAR - O'ng tomon (1/3) */}
        <div className="w-full lg:w-72 flex-shrink-0">
          {/* <BlogSidebar /> */}
          <div className="bg-gray-50 h-96 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed text-sm">
            BlogSidebar:
            <br />
            - Kategoriyalar
            <br />
            - Trending Now
            <br />
            - Gallery
            <br />
            - Popular Tags
            <br />
            (Abduvohid)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
