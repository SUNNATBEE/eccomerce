// /**
//  * Blog.jsx - Blog & Yangiliklar sahifasi
//  * ====================================================
//  * VAZIFA: ABDUVOHID
//  * ====================================================
//  *
//  * Figma UI ga qarab Blog sahifasi quyidagi bo'limlardan iborat:
//  *
//  * 1. PageBanner   - "Blog & News" sarlavha + kategoriya tablar
//  *    - Tablar: Shopping | Recipe | Kitchen | Home | Food
//  * 2. BlogGrid     - Asosiy blog postlar (3 ustunli grid)
//  * 3. Sidebar      - O'ng tomon:
//  *    - Categoriya ro'yxati (soni bilan)
//  *    - Trending Now (rasm + sarlavha + narx)
//  *    - Gallery (kichik rasmlar seti)
//  *    - Popular Tags
//  * 4. Pagination   - Sahifalar almashtirish
//  *
//  * QILISH KERAK BO'LGAN ISHLAR:
//  *
//  * 1. BlogCard komponentini yarating (src/components/blog/BlogCard.jsx):
//  *    - Rasm (to'liq kenglikda)
//  *    - Kategoriya badge (masalan: "Recipe")
//  *    - Blog sarlavhasi
//  *    - Muallif, sana, izohlar soni
//  *    - Link → /blog/:id sahifasiga
//  *
//  * 2. BlogSidebar komponentini yarating (src/components/blog/BlogSidebar.jsx):
//  *    - Kategoriya ro'yxati (soni bilan)
//  *    - Trending Now bo'limi
//  *    - Gallery rasmlar (kichik grid)
//  *    - Popular Tags (badge ko'rinishida)
//  *
//  * 3. API dan bloglarni oling:
//  *    import { getBlogs } from "../../services/api";
//  *    import useFetch from "../../hooks/useFetch";
//  *    const { data, loading, error } = useFetch(getBlogs, { page: 1 });
//  *
//  * 4. Kategoriya filter:
//  *    - Tab bosilganda: getBlogs({ category: "recipe" })
//  *    - useState bilan activeTab boshqariladi
//  *
//  * 5. Pagination:
//  *    import Pagination from "../../components/shared/Pagination";
//  *    <Pagination
//  *      currentPage={page}
//  *      totalPages={data?.totalPages}
//  *      onPageChange={(p) => setPage(p)}
//  *    />
//  *
//  * BLOG MA'LUMOT TUZILMASI (API dan keladigan):
//  * {
//  *   _id: "...",
//  *   title: "Blog sarlavhasi",
//  *   excerpt: "Qisqacha tavsif...",
//  *   image: "rasm-url",
//  *   category: "Recipe",
//  *   author: { name: "Muallif", avatar: "..." },
//  *   createdAt: "2024-01-01",
//  *   commentsCount: 5
//  * }
//  *
//  * DIQQAT: Faqat shu sahifa va src/components/blog/ papkasidagi
//  * komponentlarni o'zgartiring!
//  */

// import { useState } from "react";
// import Breadcrumb from "../../components/shared/Breadcrumb";
// import Pagination from "../../components/shared/Pagination";

// // Blog kategoriya tablari
// const BLOG_TABS = ["All", "Shopping", "Recipe", "Kitchen", "Home", "Food"];

// const Blog = () => {
//   // Faol tab holati
//   const [activeTab, setActiveTab] = useState("All");
//   // Hozirgi sahifa
//   const [currentPage, setCurrentPage] = useState(1);

//   // TODO: API dan blog ma'lumotlarini oling
//   // const { data, loading } = useFetch(getBlogs, { page: currentPage, category: activeTab });

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       {/* Breadcrumb */}
//       <Breadcrumb items={[{ label: "Blog" }]} />

//       {/* ===== PAGE BANNER ===== */}
//       <div className="bg-green-50 rounded-lg p-6 mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-3">Blog & News</h1>
//         {/* Kategoriya tablar */}
//         <div className="flex gap-2 flex-wrap">
//           {BLOG_TABS.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => {
//                 setActiveTab(tab);
//                 setCurrentPage(1); // Tab o'zgarganda 1-sahifadan boshlash
//               }}
//               className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
//                 activeTab === tab
//                   ? "bg-green-500 text-white"
//                   : "bg-white text-gray-600 hover:bg-green-50 border border-gray-200"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ===== ASOSIY KONTENT + SIDEBAR ===== */}
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Blog postlar grid - Chap tomon (2/3) */}
//         <div className="flex-1">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">
//             📰 Recipes Articles
//           </h2>

//           {/* Blog kartochkalar grid */}
//           {/* <BlogGrid blogs={data?.blogs} loading={loading} /> */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* TODO: BlogCard komponentini yarating va shu yerda mapping qiling */}
//             {Array(9)
//               .fill(null)
//               .map((_, i) => (
//                 <div
//                   key={i}
//                   className="bg-gray-50 h-48 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed text-sm"
//                 >
//                   BlogCard #{i + 1} (Abduvohid)
//                 </div>
//               ))}
//           </div>

//           {/* Pagination */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={5}
//             onPageChange={setCurrentPage}
//           />
//         </div>

//         {/* SIDEBAR - O'ng tomon (1/3) */}
//         <div className="w-full lg:w-72 flex-shrink-0">
//           {/* <BlogSidebar /> */}
//           <div className="bg-gray-50 h-96 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed text-sm">
//             BlogSidebar:
//             <br />
//             - Kategoriyalar
//             <br />
//             - Trending Now
//             <br />
//             - Gallery
//             <br />
//             - Popular Tags
//             <br />
//             (Abduvohid)
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blog;


//       {/* ===== ASOSIY KONTENT + SIDEBAR ===== */}
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Blog postlar grid - Chap tomon (2/3) */}
//         <div className="flex-1">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">
//             📰 Recipes Articles
//           </h2>

//           {/* Blog kartochkalar grid */}
//           {/* <BlogGrid blogs={data?.blogs} loading={loading} /> */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* TODO: BlogCard komponentini yarating va shu yerda mapping qiling */}
//             {Array(9)
//               .fill(null)
//               .map((_, i) => (
//                 <div
//                   key={i}
//                   className="bg-gray-50 h-48 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed text-sm"
//                 >
//                   BlogCard #{i + 1} (Abduvohid)
//                 </div>
//               ))}
//           </div>

//           {/* Pagination */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={5}
//             onPageChange={setCurrentPage}
//           />
//         </div>

//         {/* SIDEBAR - O'ng tomon (1/3) */}
//         <div className="w-full lg:w-72 flex-shrink-0">
//           {/* <BlogSidebar /> */}
//           <div className="bg-gray-50 h-96 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed text-sm">
//             BlogSidebar:
//             <br />
//             - Kategoriyalar
//             <br />
//             - Trending Now
//             <br />
//             - Gallery
//             <br />
//             - Popular Tags
//             <br />
//             (Abduvohid)
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blog;

/**
 * Blog.jsx - Blog & Yangiliklar sahifasi (Nest dizayniga moslashtirilgan)
 */
// src/pages/Blog.jsx   (yoki loyihangizdagi joylashuviga qarab)

import { useState } from "react";

import Breadcrumb from "../../components/shared/Breadcrumb";
import Pagination from "../../components/shared/Pagination";

import BlogCard from "./BlogCard";
import BlogSidebar from "./BlogSidebar";

import { getBlogs } from "../../services/api";
import useFetch from "../../hooks/useFetch";

const BLOG_TABS = ["All", "Shopping", "Recipe", "Kitchen", "Home", "Food"];

const Blog = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const params = {
    page: currentPage,
    category: activeTab,
  };

  const { data, loading, error } = useFetch(getBlogs, params);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      {/* Page Banner / Header */}
      <div className="bg-green-50/70 rounded-2xl p-6 md:p-10 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center md:text-left">
          Blog & News
        </h1>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          Yangi retseptlar, oshxona maslahatlari va oziq-ovqat trendlari haqida yangiliklar
        </p>
[03.03.2026 0:26] A/N: 

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
          {BLOG_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-green-50 border border-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main content + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
        {/* Left - Blog posts */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {activeTab === "All" ? "Barcha Maqolalar" : `${activeTab} Maqolalari`}
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-80 bg-gray-100 rounded-xl animate-pulse"
                  />
                ))}
            </div>
          ) : error ? (
            <div className="text-red-600 text-center py-12 text-lg font-medium">
              Xatolik yuz berdi: {error}
              <br />
              <small className="text-gray-500">(Server bilan aloqa muammosi bo‘lishi mumkin)</small>
            </div>
          ) : !data?.blogs || data.blogs.length === 0 ? (
            <div className="text-center py-12 text-gray-600 text-lg">
              Hozircha maqola topilmadi...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-10 flex justify-center">
                <Pagination
                  currentPage={data.currentPage || currentPage}
                  totalPages={data.totalPages || 1}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>

        {/* Right - Sidebar */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
          <BlogSidebar />
        </div>
      </div>
    </div>
  );
};

export default Blog;

