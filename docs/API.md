# 📡 API Qo'llanma - Barcha O'quvchilar Uchun

Bu hujjat backend API dan qanday foydalanishni tushuntiradi.

---

## 🔗 API Manzili

```
Local:   http://localhost:5000/api
Render:  https://nest-backend-XXXXX.onrender.com/api
Swagger: http://localhost:5000/api-docs
```

---

## 📁 Frontend da API ishlatish

### 1. services/api.js faylini import qiling

```javascript
// Kerakli funksiyalarni import qiling
import {
  getProducts,
  getProductById,
  getCategories,
  getBlogs,
  getBlogById,
  sendContactForm,
} from "../../services/api";
```

### 2. useFetch hook bilan ishlash

```javascript
import useFetch from "../../hooks/useFetch";

// Oddiy ishlatilish
const { data, loading, error } = useFetch(getProducts);

// Parametr bilan
const { data, loading, error } = useFetch(getProducts, { page: 1, limit: 12 });

// ID bilan
const { data: product, loading } = useFetch(getProductById, "mahsulot_id");

// Qayta yuklash (refresh)
const { data, refetch } = useFetch(getProducts);
// refetch() - qayta yuklanadi
```

### 3. Loading va Error holatlarini ko'rsatish

```jsx
const { data, loading, error } = useFetch(getProducts);

if (loading) {
  return (
    // Loading skeleton
    <div className="grid grid-cols-4 gap-4">
      {Array(8).fill(null).map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-48" />
      ))}
    </div>
  );
}

if (error) {
  return (
    <div className="text-center py-10">
      <p className="text-red-500">{error}</p>
      <button onClick={refetch} className="mt-2 text-green-600 underline">
        Qayta urinish
      </button>
    </div>
  );
}

// Ma'lumotlar mavjud
return <div>{/* data ni ko'rsating */}</div>;
```

---

## 📦 API Endpointlar

### Mahsulotlar

| Method | URL | Tavsif |
|--------|-----|--------|
| GET | `/api/products` | Barcha mahsulotlar |
| GET | `/api/products/:id` | Bitta mahsulot |
| GET | `/api/products?category=vegetables` | Kategoriya bo'yicha |
| GET | `/api/products?page=1&limit=12` | Sahifalash |
| GET | `/api/products?sort=popular` | Saralash |
| GET | `/api/products?minPrice=10&maxPrice=100` | Narx filtri |
| GET | `/api/products?search=apple` | Qidiruv |

**Javob namunasi:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "_id": "abc123",
        "name": "Seeds of Change Organic Quinoa",
        "price": 38.00,
        "oldPrice": 52.00,
        "image": "https://...",
        "category": { "_id": "cat1", "name": "Vegetables" },
        "rating": 4,
        "sold": 120,
        "inStock": true,
        "badge": "NEW"
      }
    ],
    "total": 150,
    "page": 1,
    "totalPages": 13
  }
}
```

### Kategoriyalar

| Method | URL | Tavsif |
|--------|-----|--------|
| GET | `/api/categories` | Barcha kategoriyalar |
| GET | `/api/categories/:id` | Bitta kategoriya |

**Javob namunasi:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "cat1",
      "name": "Vegetables",
      "slug": "vegetables",
      "icon": "https://...",
      "productCount": 45
    }
  ]
}
```

### Bloglar

| Method | URL | Tavsif |
|--------|-----|--------|
| GET | `/api/blogs` | Barcha bloglar |
| GET | `/api/blogs/:id` | Bitta blog |
| GET | `/api/blogs?category=recipe` | Kategoriya filtr |
| GET | `/api/blogs?page=1&limit=9` | Sahifalash |

**Javob namunasi:**
```json
{
  "success": true,
  "data": {
    "blogs": [
      {
        "_id": "blog1",
        "title": "The Intermediate Guide to Healthy Food",
        "excerpt": "Qisqacha tavsif...",
        "content": "To'liq matn...",
        "image": "https://...",
        "category": "Recipe",
        "author": {
          "name": "Benramo Corrland",
          "avatar": "https://..."
        },
        "tags": ["Healthy", "Recipe"],
        "createdAt": "2024-01-15T10:00:00Z",
        "commentsCount": 5
      }
    ],
    "total": 45,
    "totalPages": 5
  }
}
```

### Aloqa formasi

| Method | URL | Tavsif |
|--------|-----|--------|
| POST | `/api/contacts` | Forma yuborish |

**So'rov tanasi (request body):**
```json
{
  "firstName": "Bobur",
  "lastName": "Toshmatov",
  "email": "bobur@example.com",
  "phone": "+998901234567",
  "subject": "Umumiy savol",
  "message": "Salom, savolim bor..."
}
```

---

## 🔍 Swagger Dokumentatsiya

Swagger - API ni vizual ko'rish va test qilish vositasi.

**Qanday ochish:**
1. Backend ni ishga tushiring: `npm run dev` (nest-backend papkasida)
2. Brauzerda oching: `http://localhost:5000/api-docs`

**Swagger da endpoint test qilish:**
1. Endpoint ni bosing (masalan GET /api/products)
2. "Try it out" tugmasini bosing
3. Parametrlarni kiriting
4. "Execute" tugmasini bosing
5. Javobni ko'ring

---

## 🌐 .env sozlamalari

```bash
# Frontend (.env fayli)
VITE_API_URL=http://localhost:5000/api

# Render ga deploy qilinganda:
VITE_API_URL=https://nest-backend-XXXXX.onrender.com/api
```

---

## ⚠️ Xatolik turlaridan ehtiyot bo'ling

```javascript
// Yaxshi - try/catch bilan
try {
  const response = await sendContactForm(data);
  toast.success("Yuborildi!");
} catch (error) {
  if (error.response?.status === 400) {
    toast.error("Ma'lumotlar noto'g'ri!");
  } else if (error.response?.status === 500) {
    toast.error("Server xatoligi!");
  } else {
    toast.error("Internet aloqasi yo'q!");
  }
}
```
