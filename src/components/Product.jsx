import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getCart, setCart } from "../utils/cart";

export function DummyProduct() {
  return (
    <div className="flex-col border-4 border-white overflow-hidden lg:w-60 animate-pulse">
      <div>
        <div className="bg-gray-200 w-full flex justify-center items-center aspect-square overflow-hidden">
          <img className="w-dvw h-full object-cover object-center" />
        </div>

        <div className="h-10 leading-none p-2 overflow-hidden">
          <div className="p-3 bg-gray-300 rounded-3xl"></div>
        </div>

        <div className="px-2">
          <div className="p-2 w-1/2 rounded-3xl bg-yellow-300"></div>
        </div>

        <div className="p-2">
          <div className="p-2 w-1/3 rounded-3xl bg-green-300"></div>
        </div>
      </div>
      <div className="flex w-full p-2 h-10 bg-gray-100"></div>
    </div>
  );
}

export default function Product({ product }) {
  const location = useLocation();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    const cart = getCart(user);
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.tags.includes("Sale") ? product.finalPrice : product.price,
        qty: 1
      });
    }
    setCart(user, cart);
    // Optionally show a toast/notification
  };

  return (
    <div className="flex-col border-4 border-white overflow-hidden lg:w-60 shadow-lg hover:shadow-gray-500">
      <Link
        to={`/products/${product.id}`}
        state={{ backgroundLocation: location }}
      >
        <div className="relative bg-gray-200 flex justify-center items-center aspect-square overflow-hidden">
          {product.tags.includes("Hot") && (
            <div className="absolute text-xs font-semibold text-white bg-red-500 top-2 left-2 px-2 py-1 sm:text-sm">
              Hot
            </div>
          )}
          <img
            src={product.images[0]}
            className="w-dvw h-full object-cover object-center"
          />
        </div>

        <div className="h-10 leading-none p-2 text-sm overflow-hidden md:text-base">
          {product.name}
        </div>

        <div className="px-2 text-yellow-500 text-sm font-light md:text-base">
          Rating: {product.rating}
        </div>

        {product.tags.includes("Sale") ? (
          <div className="p-2 text-green-600 text-sm font-bold md:text-base flex items-center gap-2">
            <span>${product.finalPrice}</span>
            <span className="text-xs rounded-xl text-white px-2 py-0.5 bg-green-400">-{product.discountPercent}%</span>
          </div>
        ) : (
          <div className="p-2 text-green-600 text-sm font-bold md:text-base">
            ${product.price}
          </div>
        )}
      </Link>
      <button
        className="flex w-full text-black justify-center p-3 bg-gray-100 hover:bg-gray-300 font-semibold rounded-b-lg border-t border-gray-200 transition"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
