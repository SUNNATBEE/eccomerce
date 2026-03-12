/**
 * main.jsx - Ilovaning kirish nuqtasi
 *
 * Bu faylni o'zgartirish shart emas!
 *
 * CartProvider - barcha komponentlarga savatcha ma'lumotlarini tarqatadi
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <>
    {/* CartProvider - savatcha holati barcha sahifalarda mavjud bo'ladi */}
    <CartProvider>
      <App />
    </CartProvider>
  </>,
)
