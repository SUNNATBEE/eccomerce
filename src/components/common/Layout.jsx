/**
 * Layout.jsx - Umumiy sahifa tuzilmasi
 *
 * Bu komponent Header va Footer o'rtasida joylashadi.
 * React Router'dagi <Outlet /> - bu sahifa kontentini ko'rsatuvchi joy.
 *
 * Tuzilma:
 * ┌──────────────────┐
 * │      Header      │
 * ├──────────────────┤
 * │   <Outlet />     │  ← Bu yerda sahifa kontenti (Home, About va h.k.)
 * ├──────────────────┤
 * │      Footer      │
 * └──────────────────┘
 */

import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Yuqori qism - navigatsiya */}
      <Header />

      {/* Asosiy kontent - sahifa o'zgarganda faqat shu qism o'zgaradi */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Quyi qism - footer */}
      <Footer />
    </div>
  );
};

export default Layout;
