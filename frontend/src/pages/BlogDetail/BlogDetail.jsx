/**
 * BlogDetail.jsx - Blog post batafsil sahifasi
 * ====================================================
 * VAZIFA: SALOHIDDIN
 * ====================================================
 *
 * Figma UI ga qarab BlogDetail sahifasi quyidagi bo'limlardan iborat:
 *
 * CHAP TOMON (asosiy kontent):
 * 1. Breadcrumb   - Home > Blog > Blog sarlavhasi
 * 2. PostHeader   - Kategoriya badge + Sarlavha + Meta (muallif, sana, fikrlar)
 * 3. PostImage    - Katta asosiy rasm
 * 4. PostContent  - Blog matni (paragraflar, kichik sarlavhalar)
 * 5. PostTags     - "Tags: Cabbage | Broccoli | Green | Onion" kabi
 * 6. PostShare    - Ijtimoiy tarmoqlarda ulashish tugmalari
 * 7. AuthorBox    - Muallif haqida blok (rasm + bio)
 * 8. CommentForm  - "Leave a Comment" forma
 *
 * O'NG TOMON (sidebar):
 * - Kategoriyalar
 * - Trending Now
 * - Gallery
 * - Popular Tags
 *
 * QILISH KERAK BO'LGAN ISHLAR:
 *
 * 1. URL dan blog IDsini oling:
 *    import { useParams } from "react-router-dom";
 *    const { id } = useParams(); // /blog/123 → id = "123"
 *
 * 2. API dan blog ma'lumotini yuklang:
 *    import { getBlogById } from "../../services/api";
 *    import useFetch from "../../hooks/useFetch";
 *    const { data: blog, loading } = useFetch(getBlogById, id);
 *
 * 3. Loading holati uchun skeleton ko'rsating:
 *    if (loading) return <div className="animate-pulse">...</div>;
 *
 * 4. CommentForm komponentini yarating:
 *    - Ism, Email, Xabar maydonlari
 *    - Yuborish tugmasi
 *    - TODO: Kelajakda API ga yuborish qo'shing
 *
 * 5. Sahifani ulashish tugmalari:
 *    - window.location.href orqali URL olinadi
 *    - Facebook, Twitter, LinkedIn uchun ulashish linklari
 *
 * 6. Navigatsiya tugmalari:
 *    - "← Oldingi post" | "Keyingi post →"
 *    - /blog/:prevId va /blog/:nextId ga yo'naltiradi
 *
 * BLOG MA'LUMOT TUZILMASI:
 * {
 *   _id: "...",
 *   title: "Blog sarlavhasi",
 *   content: "To'liq matn...",
 *   image: "rasm-url",
 *   category: "Recipe",
 *   author: { name: "Ism", avatar: "...", bio: "..." },
 *   tags: ["Cabbage", "Broccoli"],
 *   createdAt: "2024-01-01",
 *   comments: [...]
 * }
 *
 * DIQQAT: Faqat shu sahifa va src/components/blog/ papkasidagi
 * komponentlarni o'zgartiring!
 */

import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/shared/Breadcrumb";
// import { getBlogById } from "../../services/api";
// import useFetch from "../../hooks/useFetch";

const BlogDetail = () => {
  // URL dan ID olish: /blog/123 → id = "123"
  const { id } = useParams();

  // TODO: API dan blog ma'lumotini oling
  // const { data: blog, loading, error } = useFetch(getBlogById, id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Blog", path: "/blog" },
          { label: "Blog Sarlavhasi" }, // TODO: blog.title qo'ying
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ===== ASOSIY KONTENT ===== */}
        <article className="flex-1">
          {/* Kategoriya badge */}
          <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded mb-3 inline-block">
            Recipe {/* TODO: blog.category */}
          </span>

          {/* Sarlavha */}
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            {/* TODO: blog.title */}
            Blog sarlavhasi bu yerda (Salohiddin)
          </h1>

          {/* Meta ma'lumotlar */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span>Muallif ismi</span>
            <span>•</span>
            <span>2024-01-01</span>
            <span>•</span>
            <span>5 ta izoh</span>
          </div>

          {/* Asosiy rasm */}
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center text-gray-500 mb-6">
            Blog asosiy rasmi (Salohiddin)
          </div>

          {/* Blog matni */}
          <div className="prose max-w-none text-gray-700 mb-6">
            {/* TODO: blog.content ni ko'rsating */}
            <div className="bg-gray-50 h-48 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed">
              Blog matni bu yerda (Salohiddin)
            </div>
          </div>

          {/* Taglar */}
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <span className="text-sm font-medium text-gray-700">Tags:</span>
            {["Cabbage", "Broccoli", "Green", "Onion"].map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-green-100 hover:text-green-700 cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Ijtimoiy tarmoqlarda ulashish */}
          <div className="bg-gray-50 h-12 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed mb-6 text-sm">
            Ulashish tugmalari: Facebook | Twitter | LinkedIn (Salohiddin)
          </div>

          {/* Oldingi/Keyingi post navigatsiyasi */}
          <div className="flex justify-between items-center border-t border-b border-gray-200 py-4 mb-6">
            <button className="text-sm text-gray-600 hover:text-green-600">
              ← Oldingi post
            </button>
            <span className="text-gray-300">|</span>
            <button className="text-sm text-gray-600 hover:text-green-600">
              Keyingi post →
            </button>
          </div>

          {/* Izoh qoldirish formasi */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Leave a Comment
            </h3>
            {/* <CommentForm blogId={id} /> */}
            <div className="bg-gray-50 h-48 flex flex-col items-center justify-center text-gray-500 rounded-lg border-2 border-dashed text-sm">
              Izoh formasi: Ism, Email, Xabar, Yuborish (Salohiddin)
            </div>
          </div>
        </article>

        {/* ===== SIDEBAR ===== */}
        <div className="w-full lg:w-72 flex-shrink-0">
          {/* <BlogDetailSidebar /> */}
          <div className="bg-gray-50 h-96 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed text-sm">
            Sidebar: Kategoriyalar | Trending | Gallery | Tags (Salohiddin)
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
