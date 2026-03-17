/**
 * Cart.jsx - Savatcha sahifasi
 * ====================================================
 * VAZIFA: ABDULAZIZ
 * ====================================================
 *
 * Savatcha sahifasi tuzilmasi:
 * ┌──────────────────────────────────────────────────┐
 * │  Breadcrumb: Home > Cart                         │
 * ├─────────────────────────┬────────────────────────┤
 * │  SAVATCHA JADVAL        │  ORDER SUMMARY         │
 * │  - Mahsulot rasmi       │  - Subtotal            │
 * │  - Nomi, narxi          │  - Delivery            │
 * │  - Miqdor (+/-)         │  - Discount            │
 * │  - O'chirish tugmasi    │  - TOTAL               │
 * │                         │  - "Checkout" tugma    │
 * │  [Savashni tozalash]    │  - Kupon kodi input    │
 * └─────────────────────────┴────────────────────────┘
 *
 * QILISH KERAK BO'LGAN ISHLAR:
 *
 * 1. CartContext dan foydalaning:
 *    import { useCart } from "../../context/CartContext";
 *    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
 *
 * 2. Bo'sh savatcha holati:
 *    if (cartItems.length === 0) {
 *      return <EmptyCart />; // "Savatchangiz bo'sh" ko'rinishi
 *    }
 *
 * 3. CartItem komponentini yarating:
 *    - Mahsulot rasmi + nomi + narxi
 *    - Miqdor +/- tugmalari
 *    - O'chirish (X) tugmasi
 *    - Jami narx (narx × miqdor)
 *
 * 4. OrderSummary komponentini yarating:
 *    - Subtotal: cartTotal
 *    - Delivery: bepul yoki $5
 *    - Discount: kupon qo'llanilsa
 *    - Grand Total: subtotal + delivery - discount
 *    - "Proceed to Checkout" tugmasi
 *
 * 5. Kupon kodi:
 *    const [coupon, setCoupon] = useState("");
 *    const [discount, setDiscount] = useState(0);
 *    const applyCoupon = () => {
 *      // TODO: API ga kupon tekshirish so'rovi yuborish
 *      if (coupon === "NEST10") setDiscount(10);
 *    };
 *
 * DIQQAT: Faqat shu sahifa va src/components/cart/ papkasidagi
 * komponentlarni o'zgartiring!
 */

import { Link } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import Breadcrumb from "../../components/shared/Breadcrumb";
// import { useCart } from "../../context/CartContext";

const Cart = () => {
  // TODO: useCart() hookidan foydalaning
  // const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  // Test uchun mock data
  const cartItems = [];
  const cartTotal = 0;

  // Savatcha bo'sh bo'lsa
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb items={[{ label: "Cart" }]} />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FiShoppingBag size={64} className="text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Savatchangiz bo'sh
          </h2>
          <p className="text-gray-500 mb-6">
            Hali hech narsa qo'shilmagan. Xarid qilishni boshlang!
          </p>
          <Link
            to="/shop"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Do'konga o'tish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: "Cart" }]} />

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Savatcha ({cartItems.length} ta mahsulot)
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ===== SAVATCHA JADVAL ===== */}
        <div className="flex-1">
          {/* Jadval sarlavhasi */}
          <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 pb-2 border-b border-gray-200 mb-2">
            <div className="col-span-6">Mahsulot</div>
            <div className="col-span-2 text-center">Narx</div>
            <div className="col-span-2 text-center">Miqdor</div>
            <div className="col-span-2 text-center">Jami</div>
          </div>

          {/* Savatcha elementlari */}
          {/* TODO: cartItems.map qiling */}
          <div className="bg-gray-50 h-32 flex items-center justify-center text-gray-500 rounded-lg border-2 border-dashed text-sm">
            CartItem komponentini yarating va map qiling (Abdulaziz)
          </div>

          {/* Pastki tugmalar */}
          <div className="flex justify-between items-center mt-4">
            <Link
              to="/shop"
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              ← Xaridni davom ettirish
            </Link>
            <button className="text-sm text-red-500 hover:text-red-600">
              Savatchani tozalash
            </button>
          </div>
        </div>

        {/* ===== ORDER SUMMARY ===== */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Buyurtma xulosasi
            </h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Yetkazib berish</span>
                <span className="font-medium text-green-600">Bepul</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                <span>Jami</span>
                <span className="text-green-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Kupon kodi */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Kupon kodi"
                className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-green-500"
              />
              <button className="bg-gray-800 text-white px-3 py-2 rounded text-sm hover:bg-gray-900 transition-colors">
                Qo'llash
              </button>
            </div>

            {/* Checkout tugmasi */}
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors">
              Buyurtma berish →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
