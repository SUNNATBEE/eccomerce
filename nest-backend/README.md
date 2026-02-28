# 🖥️ Nest Mart - Backend (Node.js + Express + MongoDB)

Bu backend Nest Mart e-commerce saytining server qismi.
**Node.js + Express + MongoDB** asosida qurilgan.
**Render** platformasida bepul hosting.

---

## 📦 O'rnatilgan kutubxonalar

| Kutubxona | Maqsadi |
|---|---|
| `express` | Web server framework |
| `mongoose` | MongoDB bilan ishlash |
| `dotenv` | .env faylini yuklash |
| `cors` | Frontend dan so'rovlarga ruxsat |
| `morgan` | HTTP loglash |
| `express-validator` | Forma validatsiya |
| `swagger-jsdoc` | JSDoc dan Swagger yaratish |
| `swagger-ui-express` | Swagger UI ko'rsatish |
| `nodemon` | Avtomatik restart (dev) |

---

## 🗂️ Fayl tuzilmasi

```
nest-backend/
├── src/
│   ├── config/
│   │   ├── db.js          ← MongoDB ulanish
│   │   └── swagger.js     ← Swagger sozlamalari
│   ├── models/
│   │   ├── Category.js    ← Kategoriya modeli
│   │   ├── Product.js     ← Mahsulot modeli
│   │   ├── Blog.js        ← Blog modeli
│   │   └── Contact.js     ← Aloqa formasi modeli
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   ├── blogController.js
│   │   └── contactController.js
│   ├── routes/
│   │   ├── productRoutes.js    ← Swagger docs bilan
│   │   ├── categoryRoutes.js   ← Swagger docs bilan
│   │   ├── blogRoutes.js       ← Swagger docs bilan
│   │   └── contactRoutes.js    ← Swagger docs bilan
│   ├── middleware/
│   │   └── errorHandler.js    ← Global xatolik
│   └── app.js                 ← Express ilovasi
├── server.js                  ← Kirish nuqtasi
├── .env.example               ← Muhit o'zgaruvchilar namunasi
├── .gitignore
└── package.json
```

---

## 🚀 Ishga tushirish

### 1. Kutubxonalarni o'rnatish
```bash
npm install
```

### 2. .env fayl yaratish
```bash
cp .env.example .env
```
`.env` faylini oching va to'ldiring:
```
PORT=5000
MONGODB_URI=mongodb+srv://...
CLIENT_URL=http://localhost:5173
```

### 3. Development rejimda ishga tushirish
```bash
npm run dev
```

Natija:
```
✅ MongoDB ulandi: cluster0.xxxxx.mongodb.net
🚀 Nest Mart API Server ishga tushdi!
📍 Server: http://localhost:5000
📚 Swagger: http://localhost:5000/api-docs
```

---

## 📡 API Endpointlar

| Method | URL | Tavsif |
|---|---|---|
| GET | `/api/products` | Barcha mahsulotlar |
| GET | `/api/products/:id` | Bitta mahsulot |
| POST | `/api/products` | Mahsulot qo'shish |
| GET | `/api/categories` | Barcha kategoriyalar |
| POST | `/api/categories` | Kategoriya qo'shish |
| GET | `/api/blogs` | Barcha bloglar |
| GET | `/api/blogs/:id` | Bitta blog |
| POST | `/api/contacts` | Xabar yuborish |

---

## 🌐 MongoDB Atlas (Bepul) Sozlash

1. **https://www.mongodb.com/atlas** ga kiring
2. **"Try Free"** tugmasini bosing
3. Google/GitHub bilan ro'yxatdan o'ting
4. **"Create a FREE cluster"** ni tanlang (M0 - tekin)
5. Provider: **AWS**, Region: **eu-central-1** (Frankfurtga yaqin)
6. **"Create Cluster"** tugmasini bosing
7. **Security** bo'limida:
   - Username va password qo'shing (eslab qoling!)
   - IP: **0.0.0.0/0** qo'shing (hamma joydan kirish uchun)
8. **"Connect"** → **"Drivers"** → Connection string ni nusxalang
9. `.env` fayliga qo'shing:
   ```
   MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/nest-mart
   ```

---

## ☁️ Render.com ga Deploy qilish

### 1. GitHub ga push qiling
```bash
git add .
git commit -m "feat: backend ready for deployment"
git push origin main
```

### 2. Render.com da sozlash
1. **https://render.com** ga kiring (GitHub bilan login)
2. **"New"** → **"Web Service"** ni bosing
3. GitHub repo ni ulang
4. Sozlamalar:
   - **Name:** `nest-backend`
   - **Root Directory:** `nest-backend` (agar frontend bilan bitta repoda bo'lsa)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Environment Variables** bo'limiga qo'shing:
   ```
   MONGODB_URI = mongodb+srv://...
   CLIENT_URL = https://your-frontend.vercel.app
   NODE_ENV = production
   PORT = 5000
   ```
6. **"Create Web Service"** ni bosing

### 3. Deploy manzilini olish
Deploy tugagandan so'ng URL ko'rinadi:
```
https://nest-backend-xxxxx.onrender.com
```

### 4. Frontend ni yangilash
Frontend da `.env` faylini yangilang:
```
VITE_API_URL=https://nest-backend-xxxxx.onrender.com/api
```

---

## 📚 Swagger Dokumentatsiya

**Local:** http://localhost:5000/api-docs

Swagger da:
1. Endpoint ni bosing
2. **"Try it out"** tugmasini bosing
3. Parametrlarni kiriting
4. **"Execute"** ni bosing
5. Natijani ko'ring

---

## 🧪 API Test qilish (Postman)

1. Postman ni oching
2. **GET** `http://localhost:5000/api/products` - mahsulotlar
3. **GET** `http://localhost:5000/api/categories` - kategoriyalar
4. **POST** `http://localhost:5000/api/contacts` - xabar yuborish
   ```json
   {
     "firstName": "Test",
     "lastName": "User",
     "email": "test@test.com",
     "message": "Bu test xabari, 10 ta belgi"
   }
   ```

---

## ⚠️ Muhim eslatmalar

1. `.env` faylini **HECH QACHON** GitHub ga push qilmang!
2. `.gitignore` da `.env` yozilgan - xavfsiz
3. MongoDB Atlas da IP whitelist **0.0.0.0/0** bo'lsin (Render uchun)
4. Render bepul tarif: **750 soat/oy** - yetarli
5. Render da 15 daqiqa ishlatilmasa **"uxlaydi"** - birinchi so'rov sekin bo'ladi (30s)
