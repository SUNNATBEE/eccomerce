/**
 * CartContext.jsx - Savatcha holati (global state)
 *
 * React Context API yordamida savatcha ma'lumotlarini
 * barcha komponentlarga uzatish uchun.
 *
 * Bu contextdan foydalanish uchun:
 * import { useCart } from "../context/CartContext";
 * const { cartItems, addToCart, removeFromCart, cartTotal } = useCart();
 *
 * Abdulaziz - Cart page da shu contextdan foydalaning!
 * Aziza - ProductDetail da addToCart ishlatiladi.
 * Firdavs - Home da ham savatcha soni ko'rinadi.
 */

import { createContext, useContext, useState, useEffect } from "react";

// Context yaratish
const CartContext = createContext(null);

// Provider - barcha komponentlarni o'rab oladi
export const CartProvider = ({ children }) => {
  // Savatcha itemlari (localStorage dan olinadi)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // cartItems o'zgarganda localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Savatchaga mahsulot qo'shish
   * @param {object} product - Qo'shiladigan mahsulot
   * @param {number} quantity - Miqdori (default: 1)
   */
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        // Mavjud bo'lsa miqdorini oshirish
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Yangi mahsulot qo'shish
      return [...prev, { ...product, quantity }];
    });
  };

  /**
   * Savatchadan mahsulot o'chirish
   * @param {string} productId - Mahsulot IDsi
   */
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  /**
   * Mahsulot miqdorini o'zgartirish
   * @param {string} productId - Mahsulot IDsi
   * @param {number} quantity  - Yangi miqdor
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; // Prevent 0 or negative
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  /**
   * Savatchani tozalash
   */
  const clearCart = () => setCartItems([]);

  // Umumiy narxni hisoblash
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Jami mahsulotlar soni
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * useCart - CartContext dan foydalanish uchun hook
 * Faqat CartProvider ichida ishlatilishi mumkin!
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart faqat CartProvider ichida ishlatilishi mumkin!");
  }
  return context;
};

export default CartContext;
