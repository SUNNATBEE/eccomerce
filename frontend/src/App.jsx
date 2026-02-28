/**
 * App.jsx - Asosiy ilova fayli
 *
 * Bu faylda:
 * 1. AppRouter - barcha routerlar shu yerda ulanadi
 * 2. ToastContainer - bildirishnomalar uchun (react-toastify)
 *
 * Bu faylni o'zgartirish shart emas!
 */

import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* Asosiy router - barcha sahifalar shu yerda boshqariladi */}
      <AppRouter />

      {/* Toast bildirishnomalar uchun - "savatchaga qo'shildi" kabi xabarlar */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;
