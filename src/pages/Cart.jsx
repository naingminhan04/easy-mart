import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getCart, setCart, clearCart } from "../utils/cart";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [editingId, setEditingId] = useState(null);
  const [lastValidTotal, setLastValidTotal] = useState(0);
  const { user } = useAuth0();
  const [cart, setCartState] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (user) {
      setCartState(getCart(user));
    }
  }, [user]);

  const updateCart = (newCart) => {
    setCart(user, newCart);
    setCartState(newCart);
  };

  const removeItem = (id) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  let total = lastValidTotal;
  if (editingId === null) {
    total = cart.reduce((sum, item) => sum + (Number(item.qty) || 0) * item.price, 0);
  }

  useEffect(() => {
    if (editingId === null) {
      setLastValidTotal(cart.reduce((sum, item) => sum + (Number(item.qty) || 0) * item.price, 0));
    }
  }, [editingId, cart]);

  const handleCheckout = () => {
    clearCart(user);
    setCartState([]);
    setOrderSuccess(true);
  };

  if (orderSuccess) {
    return (
      <div className="flex justify-center min-h-dvh items-center h-64 text-green-600 text-2xl font-semibold">
        Order successful!
      </div>
    );
  }

  return (
    <div className="p-4 pt-15 md:pt-20 min-h-dvh max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <>
          <ul className="flex flex-col gap-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-stretch bg-white rounded-xl shadow p-4 gap-4"
              >
                {item.img && (
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover border-2 border-gray-300"
                  />
                )}
                <div className="flex flex-col flex-1 min-w-0">
                  <span
                    className="font-medium text-base hover:underline cursor-pointer truncate"
                    onClick={() => navigate(`/products/${item.id}`)}
                    title={item.name}
                  >
                    {item.name}
                  </span>
                  <span className="text-gray-700 mt-1 break-all">
                    ${item.price} x
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2 mt-2 sm:mt-0">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={item.qty}
                    onFocus={() => setEditingId(item.id)}
                    onBlur={(e) => {
                      let val = Number(e.target.value);
                      if (val < 1) val = 1;
                      if (val > 100) val = 100;
                      updateCart(cart.map((i) => i.id === item.id ? { ...i, qty: val } : i));
                      setEditingId(null);
                    }}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      setCartState(cart.map((i) => i.id === item.id ? { ...i, qty: val } : i));
                    }}
                    className="w-16 border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center"
                    title="Remove"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="font-bold mt-6 text-lg text-right">
            Total: <span className="text-green-600">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-black text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-600 transition"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
