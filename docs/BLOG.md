# 📰 Blog Page - Abduvohid

## Sen kim uchun ishlaysan?
**Abduvohid** - Blog & Yangiliklar sahifasi (Blog Page)

---

## 📍 Sening fayllaringiz

```
src/pages/Blog/Blog.jsx              ← Asosiy sahifa fayli
src/components/blog/
  ├── BlogCard.jsx                   ← Yaratishing kerak
  ├── BlogSidebar.jsx                ← Yaratishing kerak
  └── BlogGrid.jsx                   ← Yaratishing kerak
```

---

## 🎨 Figma bo'limlari va vazifalar

### 1. BlogCard (Blog post kartochkasi)
**Ko'rinishi:** Rasm + kategoriya + sarlavha + meta ma'lumotlar

```jsx
import { Link } from "react-router-dom";
import { FiUser, FiCalendar, FiMessageSquare } from "react-icons/fi";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow group">
      {/* Rasm */}
      <Link to={`/blog/${blog._id}`} className="block overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Kontent */}
      <div className="p-4">
        {/* Kategoriya */}
        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded mb-2 inline-block">
          {blog.category}
        </span>

        {/* Sarlavha */}
        <Link to={`/blog/${blog._id}`}>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-green-600 transition-colors mb-2">
            {blog.title}
          </h3>
        </Link>

        {/* Qisqacha tavsif */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {blog.excerpt}
        </p>

        {/* Meta: muallif, sana, izohlar */}
        <div className="flex items-center gap-3 text-xs text-gray-400 border-t border-gray-100 pt-2">
          <span className="flex items-center gap-1">
            <FiUser size={11} />
            {blog.author?.name}
          </span>
          <span className="flex items-center gap-1">
            <FiCalendar size={11} />
            {new Date(blog.createdAt).toLocaleDateString("uz-UZ")}
          </span>
          <span className="flex items-center gap-1">
            <FiMessageSquare size={11} />
            {blog.commentsCount || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
```

### 2. BlogSidebar (O'ng tomon)
**Ko'rinishi:** Kategoriyalar, Trending, Gallery, Tags

```jsx
import { Link } from "react-router-dom";

// Mock kategoriyalar (keyinchalik API dan olish mumkin)
const CATEGORIES = [
  { name: "Baking", count: 15 },
  { name: "Cooking", count: 28 },
  { name: "Grilling", count: 7 },
  { name: "Recipe", count: 42 },
  { name: "Food & Drink", count: 19 },
  { name: "Fruit & Vegetable", count: 11 },
];

const TAGS = ["Cabbage", "Broccoli", "Green", "Onion", "Tomato", "Salad", "Appetizer"];

const BlogSidebar = ({ trendingPosts = [], galleryImages = [] }) => {
  return (
    <div className="space-y-6">
      {/* Kategoriyalar */}
      <div className="bg-white border border-gray-100 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Category</h3>
        <ul className="space-y-2">
          {CATEGORIES.map(cat => (
            <li key={cat.name}>
              <Link
                to={`/blog?category=${cat.name.toLowerCase()}`}
                className="flex justify-between items-center text-sm text-gray-600 hover:text-green-600 transition-colors"
              >
                <span>{cat.name}</span>
                <span className="text-gray-400 text-xs">({cat.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Trending Now */}
      <div className="bg-white border border-gray-100 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Trending Now</h3>
        <div className="space-y-3">
          {trendingPosts.slice(0, 4).map(post => (
            <Link key={post._id} to={`/blog/${post._id}`} className="flex gap-3 group">
              <img
                src={post.image}
                alt={post.title}
                className="w-14 h-14 object-cover rounded flex-shrink-0"
              />
              <div>
                <p className="text-xs text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {post.title}
                </p>
                <p className="text-xs text-green-600 font-medium mt-0.5">${post.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white border border-gray-100 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Gallery</h3>
        <div className="grid grid-cols-3 gap-1">
          {galleryImages.slice(0, 9).map((img, i) => (
            <img key={i} src={img} alt="" className="w-full h-16 object-cover rounded cursor-pointer hover:opacity-80" />
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white border border-gray-100 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => (
            <Link
              key={tag}
              to={`/blog?tag=${tag.toLowerCase()}`}
              className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
```

### 3. Blog.jsx da API ishlatish

```jsx
import { useState } from "react";
import { getBlogs } from "../../services/api";
import useFetch from "../../hooks/useFetch";
import BlogCard from "../../components/blog/BlogCard";
import BlogSidebar from "../../components/blog/BlogSidebar";
import Pagination from "../../components/shared/Pagination";

const Blog = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // API dan bloglarni olish
  const { data, loading, error } = useFetch(getBlogs, {
    page: currentPage,
    limit: 9,
    category: activeTab === "All" ? "" : activeTab,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* ... */}

      {loading ? (
        // Loading skeleton
        <div className="grid grid-cols-3 gap-4">
          {Array(9).fill(null).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-48" />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">Xatolik: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data?.blogs?.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages || 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
```

---

## ✅ Tekshirish ro'yxati

- [ ] BlogCard - rasmlar va matnlar ko'rinadi
- [ ] Sidebar - kategoriyalar, trending, gallery, tags ko'rinadi
- [ ] Kategoriya tab filtri ishlaydi
- [ ] Pagination ishlaydi
- [ ] API dan ma'lumotlar keladi
- [ ] Loading holati ko'rinadi
- [ ] Blog kartochkasiga bosganda BlogDetail ga o'tadi
- [ ] Responsive ko'rinish ishlaydi

---

## ⚠️ Muhim eslatmalar

1. `BlogCard` da `/blog/:id` ga link qo'shing
2. `BlogSidebar` - Salohiddin ham ishlatadi, uni umumiy yozing
3. API dari kategoriyalar haqida `getBlogs({ category: "recipe" })` ishlating
4. Pagination da sahifa o'zgarganda sahifaning tepasiga scroll qiling:
   ```javascript
   const handlePageChange = (page) => {
     setCurrentPage(page);
     window.scrollTo({ top: 0, behavior: "smooth" });
   };
   ```
