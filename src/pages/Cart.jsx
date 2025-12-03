import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getCart, setCart, clearCart } from "../utils/cart";

export default function Cart() {
    const { user } = useAuth0();
    const [cart, setCartState] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        setCartState(getCart(user));
    }, [user]);

    const updateCart = (newCart) => {
        setCart(user, newCart);
        setCartState(newCart);
    };

    const removeItem = (id) => {
        updateCart(cart.filter(item => item.id !== id));
    };

    const changeQty = (id, qty) => {
        if (qty < 1) return;
        updateCart(cart.map(item => item.id === id ? { ...item, qty } : item));
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const handleCheckout = () => {
        clearCart(user);
        setCartState([]);
        setOrderSuccess(true);
    };

    if (orderSuccess) {
        return <div className="flex justify-center min-h-dvh items-center h-64 text-green-600 text-2xl font-semibold">Order successful!</div>;
    }

    return (
        <div className="p-4 pt-15 md:pt-20 min-h-dvh max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>
            {cart.length === 0 ? (
                <div className="text-center text-gray-500">Your cart is empty.</div>
            ) : (
                <>
                    <ul className="divide-y divide-gray-200">
                        {cart.map(item => (
                            <li key={item.id} className="flex flex-wrap justify-between items-center py-3">
                                <span className="font-medium text-base flex-1">{item.name}</span>
                                <span className="text-gray-700 mx-2">${item.price} x</span>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.qty}
                                    onChange={e => changeQty(item.id, Number(e.target.value))}
                                    className="w-16 mx-2 border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <button onClick={() => removeItem(item.id)} className="ml-2 text-red-600 hover:underline">Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="font-bold mt-6 text-lg text-right">Total: <span className="text-green-600">${total.toFixed(2)}</span></div>
                    <button onClick={handleCheckout} className="mt-6 w-full bg-black text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-900 transition">Checkout</button>
                </>
            )}
        </div>
    );
}