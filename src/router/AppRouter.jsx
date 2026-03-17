/**
 * AppRouter.jsx - Asosiy Router fayli
 *
 * Bu fayl barcha sahifalarni router orqali boshqaradi.
 * react-router-dom kutubxonasidan foydalaniladi.
 *
 * Sahifalar va ularning yo'llari (routes):
 *  /           → Home page      (Firdavs)
 *  /about      → About page     (Ziyoda)
 *  /contact    → Contact page   (Bobur)
 *  /blog       → Blog page      (Abduvohid)
 *  /blog/:id   → BlogDetail     (Salohiddin)
 *  /shop       → Shop page      (Abduvoris)
 *  /product/:id→ Single Product (Aziza)
 *  /cart       → Cart page      (Abdulaziz)
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/common/Layout";

// Barcha sahifalarni import qilish
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Blog from "../pages/Blog/Blog";
import BlogDetail from "../pages/BlogDetail/BlogDetail";
import Shop from "../pages/Shop/Shop";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Cart from "../pages/Cart/Cart";
import NotFound from "../pages/NotFound/NotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout - Header va Footer barcha sahifalar uchun umumiy */}
        <Route path="/" element={<Layout />}>
          {/* index - asosiy sahifa "/" */}
          <Route index element={<Home />} />

          {/* About sahifasi - Ziyoda qiladi */}
          <Route path="about" element={<About />} />

          {/* Contact sahifasi - Bobur qiladi */}
          <Route path="contact" element={<Contact />} />

          {/* Blog sahifasi - Abduvohid qiladi */}
          <Route path="blog" element={<Blog />} />

          {/* Blog detail - Salohiddin qiladi. :id - dinamik parameter */}
          <Route path="blog/:id" element={<BlogDetail />} />

          {/* Shop sahifasi - Abduvoris qiladi */}
          <Route path="shop" element={<Shop />} />

          {/* Single product view - Aziza qiladi. :id - mahsulot IDsi */}
          <Route path="product/:id" element={<ProductDetail />} />

          {/* Cart sahifasi - Abdulaziz qiladi */}
          <Route path="cart" element={<Cart />} />

          {/* 404 - topilmagan sahifalar uchun */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
