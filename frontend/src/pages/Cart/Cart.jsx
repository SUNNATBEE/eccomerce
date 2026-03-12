import { Link } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import Breadcrumb from "../../components/shared/Breadcrumb";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumb items={[{ label: "Cart" }]} />
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-[#DEF9EC] rounded-full flex items-center justify-center mb-6">
              <FiShoppingBag size={40} className="text-[#3BB77E]" />
            </div>
            <h2 className="text-2xl font-bold text-[#253D4E] mb-2">
              Your cart is currently empty
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm">
              There are no products in your cart. Go back to our store and pick something you like!
            </p>
            <Link
              to="/shop"
              className="bg-[#3BB77E] hover:bg-[#253D4E] text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-sm"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Cart" }]} />

        <div className="mt-8 mb-12">
          <h1 className="text-4xl font-bold text-[#253D4E]">Your Cart</h1>
          <p className="text-gray-500 mt-2">
            There {cartItems.length === 1 ? "is" : "are"}{" "}
            <span className="text-[#3BB77E] font-bold">
              {cartItems.length} {cartItems.length === 1 ? "product" : "products"}
            </span>{" "}
            in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ===== SAVATCHA JADVAL ===== */}
          <div className="lg:col-span-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f2f3f8] rounded-xl">
                  <tr>
                    <th className="p-4 pl-6 text-sm font-bold text-[#253D4E] rounded-l-2xl">Product</th>
                    <th className="p-4 text-sm font-bold text-[#253D4E] text-center">Price</th>
                    <th className="p-4 text-sm font-bold text-[#253D4E] text-center">Quantity</th>
                    <th className="p-4 text-sm font-bold text-[#253D4E] text-center">Subtotal</th>
                    <th className="p-4 pr-6 text-sm font-bold text-[#253D4E] rounded-r-2xl text-right">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <tr key={item._id} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-gray-50 rounded-xl p-2 flex items-center justify-center shrink-0 border border-transparent group-hover:border-green-100 transition-all">
                            <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#253D4E] text-base leading-snug mb-1 hover:text-[#3BB77E] cursor-pointer transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-400">Unit: <span className="text-[#3BB77E]">500g</span></p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-4 text-center">
                        <span className="font-bold text-[#253D4E] text-lg">${item.price.toFixed(2)}</span>
                      </td>
                      <td className="py-6 px-4">
                        <div className="flex justify-center">
                          <div className="flex items-center border border-[#3BB77E] rounded-lg p-1 bg-white">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#3BB77E] hover:text-white rounded text-[#3BB77E] transition-all"
                            >
                              <FiMinus size={12} />
                            </button>
                            <span className="w-10 text-center font-bold text-[#253D4E] text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#3BB77E] hover:text-white rounded text-[#3BB77E] transition-all"
                            >
                              <FiPlus size={12} />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-4 text-center">
                        <span className="font-bold text-[#3BB77E] text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                      </td>
                      <td className="py-6 px-4 text-right">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap justify-between items-center mt-10 p-6 bg-[#f8f9fb] rounded-2xl border border-gray-100">
              <Link
                to="/shop"
                className="flex items-center gap-2 text-[#253D4E] hover:text-[#3BB77E] font-bold transition-colors"
              >
                <FiArrowLeft /> Continue Shopping
              </Link>
              <button
                onClick={() => {
                  clearCart();
                  toast.info("Cart cleared");
                }}
                className="flex items-center gap-2 bg-white text-gray-500 hover:bg-red-500 hover:text-white px-6 py-2.5 rounded-xl font-bold border border-gray-200 hover:border-red-500 transition-all shadow-sm"
              >
                <FiTrash2 /> Clear Cart
              </button>
            </div>
          </div>

          {/* ===== ORDER SUMMARY ===== */}
          <div className="lg:col-span-4 mt-10 lg:mt-0">
            <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] sticky top-28">
              <h3 className="text-xl font-bold text-[#253D4E] mb-6 pb-4 border-b border-gray-50">
                Order Summary
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-lg font-bold text-[#253D4E]">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Shipping</span>
                  <span className="text-sm font-bold text-[#3BB77E]">Free</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-gray-500 font-medium">Tax</span>
                  <span className="text-[#253D4E] font-bold">$0.00</span>
                </div>
                <div className="border-t border-gray-50 pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-[#253D4E]">Total</span>
                  <span className="text-2xl font-bold text-[#3BB77E]">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mb-8">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1 bg-[#f4f6fa] border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#3BB77E] font-medium"
                  />
                  <button
                    onClick={() => toast.warning("Invalid coupon code!")}
                    className="bg-[#253D4E] text-white px-5 py-3 rounded-xl font-bold hover:bg-[#3BB77E] transition-all"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <button
                onClick={() => toast.success("Your order has been placed!")}
                className="w-full bg-[#3BB77E] hover:bg-[#253D4E] text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                Place Order <FiShoppingBag className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-6 text-center">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                  100% secure payment guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
