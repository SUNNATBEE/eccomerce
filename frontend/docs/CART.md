# 🛒 Cart Page - Abdulaziz

## Sen kim uchun ishlaysan?
**Abdulaziz** - Savatcha sahifasi (Cart Page)

---

## 📍 Sening fayllaringiz

```
src/pages/Cart/Cart.jsx              ← Asosiy sahifa fayli (tayyor, to'ldirish kerak)
src/components/cart/
  ├── CartItem.jsx                   ← Yaratishing kerak
  └── OrderSummary.jsx               ← Yaratishing kerak
```

---

## 🎨 Figma bo'limlari va vazifalar

### 1. CartContext dan foydalanish

```jsx
// Cart.jsx da shu kod bilan boshlang:
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const {
    cartItems,       // Savatcadagi mahsulotlar massivi
    removeFromCart,  // Mahsulot o'chirish: removeFromCart("mahsulot_id")
    updateQuantity,  // Miqdor o'zgartirish: updateQuantity("id", 3)
    cartTotal,       // Umumiy narx (son)
    cartCount,       // Jami mahsulotlar soni
    clearCart,       // Savatchani tozalash
  } = useCart();

  // ...
};
```

### 2. CartItem komponenti

```jsx
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center">
      {/* Mahsulot - 6 ustun */}
      <div className="col-span-6 flex items-center gap-3">
        <Link to={`/product/${item._id}`}>
          <img src={item.image} alt={item.name}
            className="w-16 h-16 object-contain bg-gray-50 rounded-lg p-1" />
        </Link>
        <div>
          <Link to={`/product/${item._id}`}>
            <p className="text-sm font-medium text-gray-800 hover:text-green-600 line-clamp-2">
              {item.name}
            </p>
          </Link>
          {/* Kategoriya */}
          <p className="text-xs text-gray-400 mt-0.5">{item.category?.name}</p>
        </div>
      </div>

      {/* Narx - 2 ustun */}
      <div className="col-span-2 text-center">
        <p className="text-sm font-medium text-gray-700">
          ${item.price?.toFixed(2)}
        </p>
        {item.oldPrice && (
          <p className="text-xs text-gray-400 line-through">${item.oldPrice?.toFixed(2)}</p>
        )}
      </div>

      {/* Miqdor - 2 ustun */}
      <div className="col-span-2 flex items-center justify-center">
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="px-2 py-1.5 hover:bg-gray-50 text-gray-600 disabled:opacity-40"
            disabled={item.quantity <= 1}
          >
            <FiMinus size={12} />
          </button>
          <span className="px-3 py-1 text-sm font-medium min-w-8 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="px-2 py-1.5 hover:bg-gray-50 text-gray-600"
          >
            <FiPlus size={12} />
          </button>
        </div>
      </div>

      {/* Jami + O'chirish - 2 ustun */}
      <div className="col-span-2 flex items-center justify-end gap-2">
        <p className="text-sm font-bold text-green-600">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item._id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="O'chirish"
        >
          <FiTrash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
```

### 3. OrderSummary komponenti

```jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const DELIVERY_FEE = 5; // Yetkazib berish narxi
const FREE_DELIVERY_THRESHOLD = 50; // Bu miqdordan yuqorida bepul

const OrderSummary = ({ subtotal }) => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  // Yetkazib berish narxi
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

  // Grand total
  const total = subtotal + delivery - discount;

  // Kupon qo'llash
  const applyCoupon = () => {
    if (couponApplied) { toast.info("Kupon allaqachon qo'llangan!"); return; }

    // Valid kuponlar (test uchun)
    const COUPONS = {
      "NEST10": 10,   // $10 chegirma
      "NEST20": 20,   // $20 chegirma
      "WELCOME5": 5,  // $5 chegirma
    };

    if (COUPONS[coupon.toUpperCase()]) {
      setDiscount(COUPONS[coupon.toUpperCase()]);
      setCouponApplied(true);
      toast.success(`Kupon qo'llandi! $${COUPONS[coupon.toUpperCase()]} chegirma berildi`);
    } else {
      toast.error("Kupon kodi noto'g'ri!");
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-5 sticky top-24">
      <h3 className="text-lg font-bold text-gray-800 mb-5">Buyurtma xulosasi</h3>

      {/* Narxlar */}
      <div className="space-y-3 mb-5">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Mahsulotlar jami</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Yetkazib berish</span>
          {delivery === 0 ? (
            <span className="font-medium text-green-600">Bepul</span>
          ) : (
            <span className="font-medium">${delivery.toFixed(2)}</span>
          )}
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Chegirma (kupon)</span>
            <span className="font-medium text-red-500">-${discount.toFixed(2)}</span>
          </div>
        )}

        {/* Separator */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="font-bold text-gray-800">Jami to'lov</span>
            <span className="font-bold text-green-600 text-lg">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Bepul yetkazish haqida xabar */}
      {subtotal < FREE_DELIVERY_THRESHOLD && (
        <p className="text-xs text-orange-600 bg-orange-50 rounded p-2 mb-4">
          Bepul yetkazish uchun ${(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)} ko'proq xarid qiling
        </p>
      )}

      {/* Kupon kodi */}
      <div className="mb-5">
        <label className="text-sm font-medium text-gray-700 mb-1 block">Kupon kodi</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Masalan: NEST10"
            value={coupon}
            onChange={e => setCoupon(e.target.value)}
            disabled={couponApplied}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500 disabled:bg-gray-100"
          />
          <button
            onClick={applyCoupon}
            disabled={couponApplied || !coupon}
            className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white px-3 py-2 rounded-lg text-sm transition-colors"
          >
            {couponApplied ? "✓" : "Qo'llash"}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1">Test kuponlar: NEST10, NEST20, WELCOME5</p>
      </div>

      {/* Checkout tugmasi */}
      <Link
        to="/checkout"
        className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-semibold transition-colors"
      >
        Buyurtma berish →
      </Link>

      {/* Xaridni davom ettirish */}
      <Link to="/shop" className="block text-center text-sm text-gray-500 hover:text-green-600 mt-3 transition-colors">
        ← Xaridni davom ettirish
      </Link>
    </div>
  );
};

export default OrderSummary;
```

### 4. Cart.jsx to'liq ko'rinishi

```jsx
import { useCart } from "../../context/CartContext";
import Breadcrumb from "../../components/shared/Breadcrumb";
import CartItem from "../../components/cart/CartItem";
import OrderSummary from "../../components/cart/OrderSummary";

const Cart = () => {
  const { cartItems, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (/* Bo'sh savatcha ko'rinishi */);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: "Cart" }]} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Savatcha ({cartItems.length} ta mahsulot)
        </h1>
        <button onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-600 font-medium">
          Hammani o'chirish
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Savatcha elementlari */}
        <div className="flex-1">
          {/* Jadval sarlavhasi */}
          <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-semibold text-gray-500 uppercase pb-2 border-b-2 border-gray-200 mb-2">
            <div className="col-span-6">Mahsulot</div>
            <div className="col-span-2 text-center">Narx</div>
            <div className="col-span-2 text-center">Miqdor</div>
            <div className="col-span-2 text-right">Jami</div>
          </div>

          {/* CartItem list */}
          {cartItems.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <OrderSummary subtotal={cartTotal} />
        </div>
      </div>
    </div>
  );
};
```

---

## ✅ Tekshirish ro'yxati

- [ ] Savatcha elementlari ko'rinadi (CartContext dan)
- [ ] Miqdor +/- ishlaydi
- [ ] Mahsulot o'chirish ishlaydi
- [ ] "Hammani o'chirish" ishlaydi
- [ ] Subtotal, delivery, total to'g'ri hisoblanadi
- [ ] Kupon kodi qo'llash ishlaydi (NEST10, NEST20)
- [ ] Bo'sh savatcha ko'rinishi ishlaydi
- [ ] localStorage da saqlanadi (sahifa yangilanishda saqlanib qoladi)
- [ ] Responsive ko'rinish ishlaydi

---

## ⚠️ Muhim eslatmalar

1. `useCart()` - `context/CartContext.jsx` da tayyor, shu yerdan import qiling
2. `cartItems` - `localStorage` da saqlanadi, sahifa yangilanishda yo'qolmaydi
3. Kupon kodlari hozircha frontend da tekshiriladi (keyinchalik API dan)
4. `updateQuantity(id, 0)` - avtomatik o'chirib tashlaydi (CartContext da bor)
