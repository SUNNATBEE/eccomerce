# 🛒 Nest Mart - Frontend (React)

Nest Mart - oziq-ovqat mahsulotlari uchun e-commerce sayt.
Bu loyiha **React + Vite + TailwindCSS** asosida qurilgan.

---

## 👨‍💻 Jamoa taqsimoti

| O'quvchi | Sahifa | Fayl |
|---|---|---|
| **Firdavs** | Home Page | `src/pages/Home/Home.jsx` |
| **Ziyoda** | About Page | `src/pages/About/About.jsx` |
| **Bobur** | Contact Page | `src/pages/Contact/Contact.jsx` |
| **Abduvohid** | Blog Page | `src/pages/Blog/Blog.jsx` |
| **Salohiddin** | Blog Detail | `src/pages/BlogDetail/BlogDetail.jsx` |
| **Aziza** | Single Product View | `src/pages/ProductDetail/ProductDetail.jsx` |
| **Abduvoris** | Shop Page | `src/pages/Shop/Shop.jsx` |
| **Abdulaziz** | Cart Page | `src/pages/Cart/Cart.jsx` |

---

## 📂 Fayl tuzilmasi

```
src/
├── components/
│   ├── common/
│   │   ├── Header/Header.jsx    ← Navigatsiya (tayyor)
│   │   ├── Footer/Footer.jsx    ← Footer (tayyor)
│   │   └── Layout.jsx           ← Umumiy tuzilma (tayyor)
│   ├── shared/
│   │   ├── ProductCard.jsx      ← Mahsulot kartochkasi (tayyor)
│   │   ├── Breadcrumb.jsx       ← Navigatsiya izi (tayyor)
│   │   └── Pagination.jsx       ← Sahifalar (tayyor)
│   ├── home/                    ← Firdavs yaratadi
│   ├── about/                   ← Ziyoda yaratadi
│   ├── contact/                 ← Bobur yaratadi
│   ├── blog/                    ← Abduvohid & Salohiddin yaratadi
│   ├── shop/                    ← Abduvoris yaratadi
│   └── product/                 ← Aziza yaratadi
├── pages/
│   ├── Home/Home.jsx            ← Firdavs
│   ├── About/About.jsx          ← Ziyoda
│   ├── Contact/Contact.jsx      ← Bobur
│   ├── Blog/Blog.jsx            ← Abduvohid
│   ├── BlogDetail/BlogDetail.jsx← Salohiddin
│   ├── Shop/Shop.jsx            ← Abduvoris
│   ├── ProductDetail/ProductDetail.jsx ← Aziza
│   └── Cart/Cart.jsx            ← Abdulaziz
├── router/AppRouter.jsx         ← Routerlar (tayyor)
├── services/api.js              ← API funksiyalar (tayyor)
├── hooks/useFetch.js            ← Custom hook (tayyor)
└── context/CartContext.jsx      ← Savatcha holati (tayyor)
```

---

## 🚀 Ishga tushirish

### 1. Reponi klonlash
```bash
git clone https://github.com/SIZNING_USERNAME/nest-mart-frontend.git
cd nest-mart-frontend
```

### 2. Kutubxonalarni o'rnatish
```bash
npm install
```

### 3. Muhit o'zgaruvchilarini sozlash
```bash
# .env.example faylini nusxalang
cp .env.example .env
# .env faylini oching va VITE_API_URL ni to'ldiring
```

### 4. Ishga tushirish
```bash
npm run dev
```

Brauzerda: `http://localhost:5173`

---

## 📦 O'rnatilgan kutubxonalar

| Kutubxona | Maqsadi | Ishlatiladigan joylar |
|---|---|---|
| `react-router-dom` | Sahifalar orasida o'tish | AppRouter, NavLink |
| `axios` | API ga so'rov yuborish | services/api.js |
| `react-icons` | Ikonlar | Header, Footer, ProductCard |
| `swiper` | Slider/Karusel | HeroSlider (Firdavs) |
| `react-toastify` | Bildirishnomalar | ProductCard, Cart |
| `tailwindcss` | Stil | Hamma joyda |
| `daisyui` | UI komponenlar | Kerak bo'lsa |

---

## 🌿 Git workflow (jamoaviy ishlash)

### Har kuni ish boshlanishida:
```bash
# Asosiy branchdan yangilanishlarni oling
git pull origin main
```

### O'z branchingizda ishlang:
```bash
# Yangi branch yarating (bir marta)
git checkout -b feature/firdavs-home
# yoki
git checkout -b feature/ziyoda-about
```

### Ishni saqlash:
```bash
git add .
git commit -m "feat: Home page hero slider qo'shildi"
git push origin feature/firdavs-home
```

### Pull Request oching:
- GitHub da "Compare & pull request" tugmasini bosing
- O'qituvchiga review uchun yuboring

---

## 📡 API haqida

Backend API manzili: `http://localhost:5000/api` (local)
Swagger docs: `http://localhost:5000/api-docs`

Batafsil: [`docs/API.md`](./docs/API.md)

---

## 📖 Vazifalar bo'yicha hujjatlar

- [Firdavs - Home](./docs/HOME.md)
- [Ziyoda - About](./docs/ABOUT.md)
- [Bobur - Contact](./docs/CONTACT.md)
- [Abduvohid - Blog](./docs/BLOG.md)
- [Salohiddin - Blog Detail](./docs/BLOG_DETAIL.md)
- [Aziza - Product Detail](./docs/PRODUCT_DETAIL.md)
- [Abduvoris - Shop](./docs/SHOP.md)
- [Abdulaziz - Cart](./docs/CART.md)
- [API qo'llanma](./docs/API.md)
