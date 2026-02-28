# 📄 Blog Detail Page - Salohiddin

## Sen kim uchun ishlaysan?
**Salohiddin** - Blog post batafsil sahifasi (Blog Detail Page)

---

## 📍 Sening fayllaringiz

```
src/pages/BlogDetail/BlogDetail.jsx  ← Asosiy sahifa fayli
src/components/blog/
  ├── BlogDetailContent.jsx          ← Yaratishing kerak
  ├── CommentForm.jsx                ← Yaratishing kerak
  └── ShareButtons.jsx               ← Yaratishing kerak
```

---

## 🎨 Figma bo'limlari va vazifalar

### 1. URL dan ID olish

```jsx
import { useParams, useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams(); // /blog/abc123 → id = "abc123"
  const navigate = useNavigate();

  // Agar blog topilmasa
  useEffect(() => {
    if (!loading && !blog) {
      navigate("/blog"); // Blog ro'yxatiga qaytish
    }
  }, [blog, loading]);
};
```

### 2. API dan blog olish va ko'rsatish

```jsx
import { getBlogById } from "../../services/api";
import useFetch from "../../hooks/useFetch";

const BlogDetail = () => {
  const { id } = useParams();
  const { data: blog, loading, error } = useFetch(getBlogById, id);

  // Yuklanmoqda
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  // Xatolik
  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* ... blog kontenti ... */}
    </div>
  );
};
```

### 3. Blog kontentini ko'rsatish

```jsx
const BlogDetailContent = ({ blog }) => {
  return (
    <article>
      {/* Kategoriya */}
      <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
        {blog.category}
      </span>

      {/* Sarlavha */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-3 mb-4">
        {blog.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
        <div className="flex items-center gap-2">
          <img
            src={blog.author?.avatar}
            alt={blog.author?.name}
            className="w-6 h-6 rounded-full"
          />
          <span>{blog.author?.name}</span>
        </div>
        <span>{new Date(blog.createdAt).toLocaleDateString("uz-UZ", {
          year: "numeric", month: "long", day: "numeric"
        })}</span>
        <span>{blog.commentsCount} ta izoh</span>
        <span>{blog.readTime || 5} daqiqa o'qish</span>
      </div>

      {/* Asosiy rasm */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-72 object-cover rounded-lg mb-6"
      />

      {/* Blog matni - HTML kontent */}
      <div
        className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }}
        // YOKI oddiy matn uchun:
        // <p className="text-gray-700 leading-relaxed">{blog.content}</p>
      />
    </article>
  );
};
```

### 4. Ulashish tugmalari (ShareButtons)

```jsx
import { FiFacebook, FiTwitter, FiLinkedin, FiLink } from "react-icons/fi";
import { toast } from "react-toastify";

const ShareButtons = ({ title }) => {
  const url = window.location.href;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link nusxalandi!");
  };

  return (
    <div className="flex items-center gap-3 py-4 border-t border-b border-gray-200 my-6">
      <span className="text-sm font-medium text-gray-700">Ulashing:</span>
      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer"
         className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:opacity-90">
        <FiFacebook size={14} />
      </a>
      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer"
         className="w-8 h-8 bg-sky-400 text-white rounded-full flex items-center justify-center hover:opacity-90">
        <FiTwitter size={14} />
      </a>
      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer"
         className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center hover:opacity-90">
        <FiLinkedin size={14} />
      </a>
      <button onClick={copyLink}
         className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300">
        <FiLink size={14} />
      </button>
    </div>
  );
};
```

### 5. Izoh formasi (CommentForm)

```jsx
import { useState } from "react";
import { toast } from "react-toastify";

const CommentForm = ({ blogId }) => {
  const [formData, setFormData] = useState({ name: "", email: "", comment: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.comment) {
      toast.error("Barcha maydonlarni to'ldiring!");
      return;
    }
    try {
      setLoading(true);
      // TODO: API ga izoh yuborish
      // await addComment(blogId, formData);
      toast.success("Izohingiz qabul qilindi!");
      setFormData({ name: "", email: "", comment: "" });
    } catch (err) {
      toast.error("Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Izoh qoldiring</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Ismingiz *" value={formData.name}
            onChange={e => setFormData(p => ({...p, name: e.target.value}))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500" />
          <input type="email" placeholder="Emailingiz *" value={formData.email}
            onChange={e => setFormData(p => ({...p, email: e.target.value}))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500" />
        </div>
        <textarea rows={4} placeholder="Izohingiz *" value={formData.comment}
          onChange={e => setFormData(p => ({...p, comment: e.target.value}))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500 resize-none" />
        <button type="submit" disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
          {loading ? "Yuborilmoqda..." : "Izoh qoldirish"}
        </button>
      </form>
    </div>
  );
};
```

### 6. Oldingi/Keyingi post navigatsiyasi

```jsx
import { Link } from "react-router-dom";

const PostNavigation = ({ prevPost, nextPost }) => {
  return (
    <div className="flex justify-between items-center border-t border-b border-gray-200 py-4 my-6">
      {prevPost ? (
        <Link to={`/blog/${prevPost._id}`} className="flex items-center gap-2 text-sm hover:text-green-600 transition-colors">
          <span>←</span>
          <div>
            <p className="text-gray-400 text-xs">Oldingi</p>
            <p className="text-gray-700 font-medium line-clamp-1 max-w-xs">{prevPost.title}</p>
          </div>
        </Link>
      ) : <div />}

      {nextPost ? (
        <Link to={`/blog/${nextPost._id}`} className="flex items-center gap-2 text-sm hover:text-green-600 transition-colors text-right">
          <div>
            <p className="text-gray-400 text-xs">Keyingi</p>
            <p className="text-gray-700 font-medium line-clamp-1 max-w-xs">{nextPost.title}</p>
          </div>
          <span>→</span>
        </Link>
      ) : <div />}
    </div>
  );
};
```

---

## ✅ Tekshirish ro'yxati

- [ ] URL dan ID olindi va API ga yuborildi
- [ ] Blog sarlavhasi, rasmi, kontenti ko'rinadi
- [ ] Kategoriya badge ko'rinadi
- [ ] Meta: muallif, sana, izohlar ko'rinadi
- [ ] Ulashish tugmalari ishlaydi
- [ ] Taglar ko'rinadi
- [ ] Izoh formasi ishlaydi
- [ ] Oldingi/Keyingi navigatsiya ishlaydi
- [ ] Loading skeleton ko'rinadi
- [ ] Sidebar (Abduvohid bilan kelishib) ko'rinadi

---

## ⚠️ Muhim eslatmalar

1. `getBlogById(id)` - `services/api.js` da tayyor
2. Sidebar uchun `BlogSidebar` ni Abduvohid yaratgan komponentni ishlating
3. `useParams()` dan ID ni oling, `useNavigate()` dan yo'naltirishni
4. Sahifa title ni o'zgartiring:
   ```javascript
   useEffect(() => {
     if (blog) document.title = `${blog.title} | Nest Mart`;
   }, [blog]);
   ```
